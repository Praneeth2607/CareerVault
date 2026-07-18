import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import * as userRepo from '../repositories/user.repository.js';
import * as sessionRepo from '../repositories/session.repository.js';

const SALT_ROUNDS = 12; // Required by Security.md

export const register = async ({ username, email, password }) => {
  const existingEmail = await userRepo.getUserByEmail(email);
  if (existingEmail) throw new Error('Email already in use');

  const existingUsername = await userRepo.getUserByUsername(username);
  if (existingUsername) throw new Error('Username already in use');

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await userRepo.createUser({
    username,
    email,
    passwordHash,
    authProvider: 'LOCAL'
  });

  return user;
};

export const login = async ({ email, password, deviceInfo }) => {
  const user = await userRepo.getUserByEmail(email);
  if (!user || user.auth_provider !== 'LOCAL') {
    throw new Error('Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) throw new Error('Invalid email or password');

  const refreshToken = crypto.randomBytes(40).toString('hex');
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  const session = await sessionRepo.createSession({
    userId: user.id,
    refreshTokenHash,
    deviceName: deviceInfo.deviceName,
    ipAddress: deviceInfo.ip,
    userAgent: deviceInfo.userAgent,
    expiresAt
  });

  const accessToken = jwt.sign(
    { userId: user.id, sessionId: session.id },
    process.env.JWT_SECRET || 'fallback_secret_for_dev',
    { expiresIn: '15m' }
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  };
};

export const logout = async (sessionId) => {
  await sessionRepo.deleteSession(sessionId);
};

export const refresh = async (refreshToken, sessionId) => {
  const session = await sessionRepo.getSessionById(sessionId);
  if (!session || new Date(session.expires_at) < new Date()) {
    throw new Error('Invalid or expired session');
  }
  
  const isValid = await bcrypt.compare(refreshToken, session.refresh_token_hash);
  if (!isValid) throw new Error('Invalid refresh token');

  const accessToken = jwt.sign(
    { userId: session.user_id, sessionId: session.id },
    process.env.JWT_SECRET || 'fallback_secret_for_dev',
    { expiresIn: '15m' }
  );
  return accessToken;
};

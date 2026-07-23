import bcrypt from 'bcrypt';
import * as userRepo from '../repositories/user.repository.js';
import * as auditRepo from '../repositories/audit.repository.js';

const SALT_ROUNDS = 12;

export const getProfile = async (userId) => {
  const user = await userRepo.getUserById(userId);
  if (!user) throw new Error('User not found');
  
  // Omit password hash
  const { password_hash, ...profile } = user;
  return profile;
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await userRepo.getUserById(userId);
  if (!user) throw new Error('User not found');
  if (user.auth_provider !== 'LOCAL') throw new Error('Cannot change password for OAuth accounts');
  
  const isValid = await bcrypt.compare(oldPassword, user.password_hash);
  if (!isValid) throw new Error('Incorrect old password');
  
  const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await userRepo.updatePassword(userId, newPasswordHash);
  
  await auditRepo.logAction(userId, 'PASSWORD_CHANGE', 'USER', userId);
};

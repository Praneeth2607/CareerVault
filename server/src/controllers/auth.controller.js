import * as authService from '../services/auth.service.js';
import { z } from 'zod';

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8) // required by Security.md
});

export const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await authService.register(validatedData);
    res.status(201).json({ success: true, message: 'Registration successful', data: user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation failed:', error.errors);
      return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
    }
    console.error('Registration error:', error);
    res.status(400).json({ success: false, message: error.message, errors: [] });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required', errors: [] });
    }

    const deviceInfo = {
      deviceName: req.headers['x-device-name'] || 'Unknown',
      ip: req.ip,
      userAgent: req.headers['user-agent']
    };
    
    const result = await authService.login({ email, password, deviceInfo });
    res.status(200).json({ success: true, message: 'Login successful', data: result });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ success: false, message: error.message, errors: [] });
  }
};

export const logout = async (req, res) => {
  try {
    const { sessionId } = req.user;
    await authService.logout(sessionId);
    res.status(200).json({ success: true, message: 'Logout successful', data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging out', errors: [] });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken, sessionId } = req.body;
    if (!refreshToken || !sessionId) {
      return res.status(400).json({ success: false, message: 'refreshToken and sessionId are required' });
    }
    const newAccessToken = await authService.refresh(refreshToken, sessionId);
    res.status(200).json({ success: true, message: 'Token refreshed', data: { accessToken: newAccessToken } });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

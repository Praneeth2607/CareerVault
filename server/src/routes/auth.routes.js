import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as authController from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: { success: false, message: 'Too many authentication attempts, please try again after 15 minutes' }
});

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/logout', requireAuth, authController.logout);
router.post('/refresh', authController.refresh);

// OAuth stub routes
router.get('/google', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/github', (req, res) => res.status(501).json({ message: 'Not implemented' }));

export default router;

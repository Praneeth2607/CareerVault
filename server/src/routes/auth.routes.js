import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', requireAuth, authController.logout);

// OAuth stub routes
router.get('/google', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.get('/github', (req, res) => res.status(501).json({ message: 'Not implemented' }));

export default router;

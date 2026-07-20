import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);

router.get('/', userController.getProfile);
router.patch('/password', userController.changePassword);

export default router;

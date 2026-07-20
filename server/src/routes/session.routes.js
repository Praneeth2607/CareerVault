import { Router } from 'express';
import * as sessionController from '../controllers/session.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);

router.get('/', sessionController.getActiveSessions);
router.delete('/:id', sessionController.revokeSession);
router.delete('/', sessionController.revokeAllSessions);

export default router;

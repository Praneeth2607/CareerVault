import { Router } from 'express';
import * as tagController from '../controllers/tag.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);
router.get('/', tagController.getTags);

export default router;

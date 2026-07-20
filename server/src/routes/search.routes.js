import { Router } from 'express';
import * as searchController from '../controllers/search.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);
router.get('/', searchController.searchAssets);

export default router;

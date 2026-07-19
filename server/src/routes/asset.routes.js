import { Router } from 'express';
import * as assetController from '../controllers/asset.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);

router.get('/', assetController.getAssets);
router.post('/', assetController.createAsset);
router.get('/:id', assetController.getAssetById);
router.put('/:id', assetController.updateAsset);
router.delete('/:id', assetController.deleteAsset);

router.patch('/:id/archive', assetController.archiveAsset);
router.patch('/:id/restore', assetController.restoreAsset);
router.patch('/:id/favorite', assetController.toggleFavorite);

export default router;

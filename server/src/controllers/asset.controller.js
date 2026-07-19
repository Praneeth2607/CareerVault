import * as assetService from '../services/asset.service.js';

export const createAsset = async (req, res) => {
  try {
    const asset = await assetService.createAsset(req.user.userId, req.body);
    res.status(201).json({ success: true, message: 'Asset created', data: asset });
  } catch (err) {
    console.error('Create asset error:', err);
    res.status(400).json({ success: false, message: err.message, errors: [] });
  }
};

export const updateAsset = async (req, res) => {
  try {
    const asset = await assetService.updateAsset(req.params.id, req.user.userId, req.body);
    if (!asset) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Asset updated', data: asset });
  } catch (err) {
    console.error('Update asset error:', err);
    res.status(400).json({ success: false, message: err.message, errors: [] });
  }
};

export const getAssets = async (req, res) => {
  try {
    const { type, favorite, archived, search, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    
    const filters = {
      type,
      favorite: favorite !== undefined ? favorite === 'true' : undefined,
      archived: archived !== undefined ? archived === 'true' : undefined,
      search,
      limit: parseInt(limit),
      offset
    };
    
    const assets = await assetService.getAssets(req.user.userId, filters);
    res.json({ success: true, data: assets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAssetById = async (req, res) => {
  try {
    const asset = await assetService.getAssetById(req.params.id, req.user.userId);
    if (!asset) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: asset });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const archiveAsset = async (req, res) => {
  try {
    const asset = await assetService.archiveAsset(req.params.id, req.user.userId);
    res.json({ success: true, data: asset });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const restoreAsset = async (req, res) => {
  try {
    const asset = await assetService.restoreAsset(req.params.id, req.user.userId);
    res.json({ success: true, data: asset });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const favorite = req.body.favorite === true;
    const asset = await assetService.toggleFavorite(req.params.id, req.user.userId, favorite);
    res.json({ success: true, data: asset });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const asset = await assetService.deleteAsset(req.params.id, req.user.userId);
    if (!asset) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Asset deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

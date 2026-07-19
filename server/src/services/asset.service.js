import * as assetRepo from '../repositories/asset.repository.js';
import { getSchemaByType } from '../../../shared/schemas/index.js';

const validateValues = (assetType, values) => {
  const schema = getSchemaByType(assetType);
  if (!schema) throw new Error(`Invalid asset type: ${assetType}`);
  
  const validated = {};
  for (const field of schema.fields) {
    const val = values[field.key];
    if (field.required && (val === undefined || val === null || val === '')) {
      throw new Error(`Field '${field.label}' is required`);
    }
    if (val !== undefined) {
       validated[field.key] = val;
    }
  }
  return validated;
};

export const createAsset = async (userId, data) => {
  const { assetType, title, values } = data;
  if (!assetType || !title) throw new Error('assetType and title are required');
  
  const validatedValues = validateValues(assetType, values || {});
  return assetRepo.createAsset({ userId, assetType, title, values: validatedValues });
};

export const updateAsset = async (id, userId, data) => {
  const existingAsset = await assetRepo.getAssetById(id, userId);
  if (!existingAsset) throw new Error('Asset not found');

  const title = data.title || existingAsset.title;
  let validatedValues = existingAsset.values;
  
  if (data.values) {
    validatedValues = validateValues(existingAsset.asset_type, { ...existingAsset.values, ...data.values });
  }

  return assetRepo.updateAsset(id, userId, { title, values: validatedValues });
};

export const getAssets = async (userId, filters) => {
  return assetRepo.getAssets(userId, filters);
};

export const getAssetById = async (id, userId) => {
  return assetRepo.getAssetById(id, userId);
};

export const archiveAsset = async (id, userId) => assetRepo.archiveAsset(id, userId);
export const restoreAsset = async (id, userId) => assetRepo.restoreAsset(id, userId);
export const toggleFavorite = async (id, userId, favorite) => assetRepo.toggleFavorite(id, userId, favorite);
export const deleteAsset = async (id, userId) => assetRepo.deleteAsset(id, userId);

import * as assetRepo from '../repositories/asset.repository.js';
import * as tagRepo from '../repositories/tag.repository.js';
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

const extractTags = (assetType, values) => {
  const schema = getSchemaByType(assetType);
  let allTags = [];
  for (const field of schema.fields) {
    if (field.type === 'tags' && Array.isArray(values[field.key])) {
      allTags.push(...values[field.key]);
    }
  }
  return [...new Set(allTags)];
};

export const createAsset = async (userId, data) => {
  const { assetType, title, values } = data;
  if (!assetType || !title) throw new Error('assetType and title are required');
  
  const validatedValues = validateValues(assetType, values || {});
  const asset = await assetRepo.createAsset({ userId, assetType, title, values: validatedValues });
  
  const tags = extractTags(assetType, validatedValues);
  if (tags.length > 0) {
    const tagIds = await tagRepo.upsertTags(userId, tags);
    await tagRepo.syncAssetTags(asset.id, tagIds);
  }
  
  return asset;
};

export const updateAsset = async (id, userId, data) => {
  const existingAsset = await assetRepo.getAssetById(id, userId);
  if (!existingAsset) throw new Error('Asset not found');

  const title = data.title || existingAsset.title;
  let validatedValues = existingAsset.values;
  
  if (data.values) {
    validatedValues = validateValues(existingAsset.asset_type, { ...existingAsset.values, ...data.values });
  }

  const updatedAsset = await assetRepo.updateAsset(id, userId, { title, values: validatedValues });
  
  const tags = extractTags(existingAsset.asset_type, validatedValues);
  const tagIds = tags.length > 0 ? await tagRepo.upsertTags(userId, tags) : [];
  await tagRepo.syncAssetTags(id, tagIds);
  
  return updatedAsset;
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

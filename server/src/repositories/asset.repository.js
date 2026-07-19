import { query } from '../db/index.js';

export const createAsset = async ({ userId, assetType, title, values }) => {
  const sql = `
    INSERT INTO assets (user_id, asset_type, title, values)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await query(sql, [userId, assetType, title, values]);
  return result.rows[0];
};

export const updateAsset = async (id, userId, { title, values }) => {
  const sql = `
    UPDATE assets 
    SET title = $1, values = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3 AND user_id = $4
    RETURNING *;
  `;
  const result = await query(sql, [title, values, id, userId]);
  return result.rows[0];
};

export const getAssets = async (userId, { type, favorite, archived, search, limit = 50, offset = 0 }) => {
  let sql = `SELECT * FROM assets WHERE user_id = $1`;
  const params = [userId];
  let paramIndex = 2;

  if (type) {
    sql += ` AND asset_type = $${paramIndex++}`;
    params.push(type);
  }
  
  if (favorite !== undefined) {
    sql += ` AND favorite = $${paramIndex++}`;
    params.push(favorite);
  }

  if (archived !== undefined) {
    sql += ` AND archived = $${paramIndex++}`;
    params.push(archived);
  }

  if (search) {
    sql += ` AND (title ILIKE $${paramIndex} OR values::text ILIKE $${paramIndex})`;
    params.push(`%${search}%`);
    paramIndex++;
  }

  sql += ` ORDER BY updated_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
  params.push(limit, offset);

  const result = await query(sql, params);
  return result.rows;
};

export const getAssetById = async (id, userId) => {
  const sql = `SELECT * FROM assets WHERE id = $1 AND user_id = $2`;
  const result = await query(sql, [id, userId]);
  return result.rows[0];
};

export const archiveAsset = async (id, userId) => {
  const sql = `UPDATE assets SET archived = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2 RETURNING *`;
  const result = await query(sql, [id, userId]);
  return result.rows[0];
};

export const restoreAsset = async (id, userId) => {
  const sql = `UPDATE assets SET archived = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2 RETURNING *`;
  const result = await query(sql, [id, userId]);
  return result.rows[0];
};

export const toggleFavorite = async (id, userId, favorite) => {
  const sql = `UPDATE assets SET favorite = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *`;
  const result = await query(sql, [favorite, id, userId]);
  return result.rows[0];
};

export const deleteAsset = async (id, userId) => {
  const sql = `DELETE FROM assets WHERE id = $1 AND user_id = $2 RETURNING id`;
  const result = await query(sql, [id, userId]);
  return result.rows[0];
};

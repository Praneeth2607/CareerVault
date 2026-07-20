import { query } from '../db/index.js';

export const globalSearch = async (userId, searchTerm, type) => {
  // We cast values to text to allow searching through JSONB contents easily
  const searchPattern = `%${searchTerm}%`;
  
  let sql = `
    SELECT id, asset_type, title, values, favorite, archived, updated_at
    FROM assets
    WHERE user_id = $1
    AND (title ILIKE $2 OR values::text ILIKE $2)
  `;
  const params = [userId, searchPattern];

  if (type) {
    sql += ` AND asset_type = $3`;
    params.push(type);
  }

  sql += ` ORDER BY updated_at DESC LIMIT 50`;

  const result = await query(sql, params);
  return result.rows;
};

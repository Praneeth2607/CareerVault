import { query } from '../db/index.js';

export const upsertTags = async (userId, tagNames) => {
  if (!tagNames || tagNames.length === 0) return [];
  
  // We need to insert ignoring conflicts, then fetch the IDs
  // To optimize, we can use ON CONFLICT DO NOTHING
  
  const ids = [];
  for (const name of tagNames) {
    const formattedName = name.trim().toLowerCase();
    let res = await query(
      `INSERT INTO tags (user_id, name) VALUES ($1, $2) ON CONFLICT (user_id, name) DO NOTHING RETURNING id`,
      [userId, formattedName]
    );
    
    if (res.rows.length > 0) {
      ids.push(res.rows[0].id);
    } else {
      // It already existed, so we fetch it
      res = await query(`SELECT id FROM tags WHERE user_id = $1 AND name = $2`, [userId, formattedName]);
      if (res.rows.length > 0) {
        ids.push(res.rows[0].id);
      }
    }
  }
  
  return ids;
};

export const syncAssetTags = async (assetId, tagIds) => {
  // First delete all existing tags for this asset
  await query(`DELETE FROM asset_tags WHERE asset_id = $1`, [assetId]);
  
  // Then insert the new ones
  for (const tagId of tagIds) {
    await query(`INSERT INTO asset_tags (asset_id, tag_id) VALUES ($1, $2)`, [assetId, tagId]);
  }
};

export const getTagsForUser = async (userId) => {
  const sql = `SELECT * FROM tags WHERE user_id = $1 ORDER BY name ASC`;
  const result = await query(sql, [userId]);
  return result.rows;
};

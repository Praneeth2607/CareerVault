import { query } from '../db/index.js';

export const upsertTags = async (userId, tagNames) => {
  if (!tagNames || tagNames.length === 0) return [];
  
  const existingTags = await getTagsForUser(userId);
  
  const normalize = (name) => {
    return name
      .toLowerCase()
      .replace(/[\s\.-]/g, '')
      .replace(/js$/, '');
  };
  
  const ids = [];
  for (const name of tagNames) {
    const trimmed = name.trim();
    if (!trimmed) continue;
    
    const norm = normalize(trimmed);
    const matched = existingTags.find(t => normalize(t.name) === norm);
    
    if (matched) {
      ids.push(matched.id);
    } else {
      const res = await query(
        `INSERT INTO tags (user_id, name) VALUES ($1, $2) ON CONFLICT (user_id, name) DO NOTHING RETURNING id`,
        [userId, trimmed]
      );
      
      let tagId;
      if (res.rows.length > 0) {
        tagId = res.rows[0].id;
      } else {
        const selectRes = await query(`SELECT id FROM tags WHERE user_id = $1 AND name = $2`, [userId, trimmed]);
        tagId = selectRes.rows[0]?.id;
      }
      
      if (tagId) {
        ids.push(tagId);
        existingTags.push({ id: tagId, user_id: userId, name: trimmed });
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

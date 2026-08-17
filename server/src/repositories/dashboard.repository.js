import { query } from '../db/index.js';
import * as tagRepo from './tag.repository.js';

const syncTagsFromAssets = async (userId) => {
  try {
    // 1. Fetch all active assets for this user
    const res = await query(
      `SELECT id, asset_type, values FROM assets WHERE user_id = $1 AND archived = FALSE`,
      [userId]
    );
    
    // 2. Scan and extract tags for each asset
    for (const asset of res.rows) {
      const tags = [];
      const vals = asset.values || {};
      if (Array.isArray(vals.techStack)) tags.push(...vals.techStack);
      if (Array.isArray(vals.technologies)) tags.push(...vals.technologies);
      if (Array.isArray(vals.authors)) tags.push(...vals.authors);
      if (Array.isArray(vals.keywords)) tags.push(...vals.keywords);
      if (Array.isArray(vals.tags)) tags.push(...vals.tags);
      
      const uniqueTags = [...new Set(tags.map(t => t.trim()).filter(Boolean))];
      if (uniqueTags.length > 0) {
        const tagIds = await tagRepo.upsertTags(userId, uniqueTags);
        await tagRepo.syncAssetTags(asset.id, tagIds);
      }
    }

    // 3. Clean up orphaned tags that are no longer linked to any assets
    await query(
      `DELETE FROM tags 
       WHERE user_id = $1 
       AND id NOT IN (SELECT DISTINCT tag_id FROM asset_tags)`,
      [userId]
    );
  } catch (err) {
    console.error('Error in syncTagsFromAssets:', err);
  }
};

export const getStats = async (userId) => {
  // Sync tags dynamically from JSONB data to support historical and new data
  await syncTagsFromAssets(userId);

  const assetsQuery = `
    SELECT asset_type, COUNT(*) as count 
    FROM assets 
    WHERE user_id = $1 AND archived = FALSE
    GROUP BY asset_type
  `;
  const assetsRes = await query(assetsQuery, [userId]);
  
  let projectsCount = 0;
  let experienceCount = 0;
  let achievementsCount = 0;
  let researchCount = 0;
  let resumeAssetsCount = 0;
  
  assetsRes.rows.forEach(row => {
    if (row.asset_type === 'PROJECT') projectsCount = parseInt(row.count, 10);
    if (row.asset_type === 'WORK_EXPERIENCE') experienceCount = parseInt(row.count, 10);
    if (row.asset_type === 'ACHIEVEMENT') achievementsCount = parseInt(row.count, 10);
    if (row.asset_type === 'RESEARCH') researchCount = parseInt(row.count, 10);
    if (row.asset_type === 'RESUME_ASSET') resumeAssetsCount = parseInt(row.count, 10);
  });

  // Dynamically extract unique skills from the tags table
  const tagsQuery = `SELECT COUNT(*) as count FROM tags WHERE user_id = $1`;
  let tagsCount = 0;
  try {
    const tagsRes = await query(tagsQuery, [userId]);
    tagsCount = parseInt(tagsRes.rows[0].count, 10);
  } catch (err) {
    console.error('Error fetching tags count:', err);
  }

  return {
    projects: projectsCount,
    experience: experienceCount,
    achievements: achievementsCount,
    research: researchCount,
    resumeAssets: resumeAssetsCount,
    skills: tagsCount
  };
};


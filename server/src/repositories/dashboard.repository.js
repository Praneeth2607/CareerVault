import { query } from '../db/index.js';

export const getStats = async (userId) => {
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
    if (row.asset_type === 'EXPERIENCE') experienceCount = parseInt(row.count, 10);
    if (row.asset_type === 'ACHIEVEMENT') achievementsCount = parseInt(row.count, 10);
    if (row.asset_type === 'RESEARCH') researchCount = parseInt(row.count, 10);
    if (row.asset_type === 'RESUME_ASSET') resumeAssetsCount = parseInt(row.count, 10);
  });

  // Dynamically extract unique skills from the newly added tags table since Phase 9
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

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
  
  assetsRes.rows.forEach(row => {
    if (row.asset_type === 'PROJECT') projectsCount = parseInt(row.count, 10);
    if (row.asset_type === 'WORK_EXPERIENCE') experienceCount = parseInt(row.count, 10);
  });

  // Dynamically extract unique skills/tags directly from the JSONB values of Projects and Experience
  const skillsQuery = `
    SELECT COUNT(DISTINCT tag) as count FROM (
      SELECT jsonb_array_elements_text(values->'techStack') AS tag FROM assets WHERE user_id = $1 AND asset_type = 'PROJECT' AND values ? 'techStack'
      UNION
      SELECT jsonb_array_elements_text(values->'technologies') AS tag FROM assets WHERE user_id = $1 AND asset_type = 'WORK_EXPERIENCE' AND values ? 'technologies'
    ) AS all_tags;
  `;
  
  let skillsCount = 0;
  try {
    const skillsRes = await query(skillsQuery, [userId]);
    skillsCount = parseInt(skillsRes.rows[0].count, 10);
  } catch (err) {
    // If no arrays exist yet, the query might be empty
    console.error('Error fetching skills count:', err);
  }

  return {
    projects: projectsCount,
    experience: experienceCount,
    skills: skillsCount
  };
};

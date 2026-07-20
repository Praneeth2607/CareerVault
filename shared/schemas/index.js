import { projectSchema } from './project.schema.js';
import { experienceSchema } from './experience.schema.js';
import { skillSchema } from './skill.schema.js';
import { achievementSchema } from './achievement.schema.js';
import { researchSchema } from './research.schema.js';
import { resumeAssetSchema } from './resume_asset.schema.js';

export const schemas = {
  [projectSchema.type]: projectSchema,
  [experienceSchema.type]: experienceSchema,
  [skillSchema.type]: skillSchema,
  [achievementSchema.type]: achievementSchema,
  [researchSchema.type]: researchSchema,
  [resumeAssetSchema.type]: resumeAssetSchema
};

export const getSchemaByType = (type) => {
  return schemas[type];
};

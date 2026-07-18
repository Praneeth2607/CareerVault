import { projectSchema } from './project.schema.js';
import { experienceSchema } from './experience.schema.js';

export const schemas = {
  [projectSchema.type]: projectSchema,
  [experienceSchema.type]: experienceSchema
};

export const getSchemaByType = (type) => {
  return schemas[type];
};

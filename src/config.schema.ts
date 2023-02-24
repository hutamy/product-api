import * as Joi from '@hapi/joi';

export const configSchema = Joi.object({
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});

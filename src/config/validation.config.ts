import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
  PROJECT_NAME: Joi.string(),
  DB_TYPE: Joi.string().valid('mariadb', 'postgres').required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  MONGODB_URI: Joi.string().required().default('mongodb://localhost:27017'),
  MONGODB_DATABASE: Joi.string().required().default('your_database'),
});

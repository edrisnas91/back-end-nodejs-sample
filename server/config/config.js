const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test'),
    API_URL: Joi.string()
      .default('http://localhost')
      .description('api container url'),
    PORT: Joi.number().default(3000),

    DB_HOST: Joi.string().description('PosgreSql DB host'),
    DB_PORT: Joi.number().description('PosgreSql DB port'),
    DB_DATABASE: Joi.string().description('PosgreSql DB database'),
    DB_USERNAME: Joi.string().description('PosgreSql DB username'),
    DB_PASSWORD: Joi.string().description('PosgreSql DB password'),

    JWT_TOKEN: Joi.string().description('JWT secret key'),

    REDIS_PORT: Joi.string().description('redis port'),
    REDIS_HOST: Joi.string().description('redis host'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV || 'development',
  port: envVars.PORT || 3000,
  apiUrl: envVars.API_URL,
  redis: {
    port: envVars.REDIS_PORT,
    host: envVars.REDIS_HOST,
  },
  jwt: {
    secret: envVars.JWT_TOKEN || 'test',
  },
  development: {
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    dialect: 'postgres',
  },
};

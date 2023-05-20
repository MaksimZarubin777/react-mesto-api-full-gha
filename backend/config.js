require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  port: process.env.PORT || 3000,
};

module.exports = config;

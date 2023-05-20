const token = require('jsonwebtoken');
const { AuthorizeError } = require('../errors/index');
const config = require('../config');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new AuthorizeError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = token.verify(jwt, config.env === 'production' ? config.jwtSecret : 'dev-secret');
  } catch (err) {
    return next(new AuthorizeError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

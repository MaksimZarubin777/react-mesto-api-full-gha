const { Joi } = require('celebrate');
const { REG_EXP } = require('../constants');

// CARD VALIDATION
const cardValidationSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().pattern(REG_EXP),
});
const cardIdValidationSchema = Joi.object({
  cardId: Joi.string().hex().length(24).required(),
});

// USER VALIDATION
const userValidationSchema = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().pattern(REG_EXP),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const userUpdateValidationSchema = Joi.object().keys({
  name: Joi.string().min(2).max(30).required(),
  about: Joi.string().min(2).max(30).required(),
});
const userAvatarValidationSchema = Joi.object().keys({
  avatar: Joi.string().pattern(REG_EXP).required(),
});
const idValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  cardIdValidationSchema,
  cardValidationSchema,
  userValidationSchema,
  userUpdateValidationSchema,
  userAvatarValidationSchema,
  idValidationSchema,
};

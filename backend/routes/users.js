const express = require('express');

const userRouter = express.Router();
const { celebrate } = require('celebrate');
const {
  idValidationSchema,
  userUpdateValidationSchema,
  userAvatarValidationSchema,
  userValidationSchema,
} = require('./validationSchema');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getMe,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getMe);
userRouter.get('/:id', celebrate({
  params: idValidationSchema,
}), getUser);
userRouter.patch('/me', celebrate({
  body: userUpdateValidationSchema,
}), updateUser);
userRouter.patch('/me/avatar', celebrate({
  body: userAvatarValidationSchema,
}), updateAvatar);

module.exports = { userRouter, userValidationSchema };

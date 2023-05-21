const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CREATED } = require('../constants');
const { BadRequestError, NotFoundError, ConflictError } = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

const findUserById = (id) => User.findById(id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  });

const updateUserData = (id, updatedData, res, next) => {
  User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
    .orFail(new NotFoundError('User not found'))
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Некорректные данные при обновлении пользователя'));
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  findUserById(id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  updateUserData(req.user._id, { name: req.body.name, about: req.body.about }, res, next);
};

const updateAvatar = (req, res, next) => {
  updateUserData(req.user._id, { avatar: req.body.avatar }, res, next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id.toString() }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.send({ data: user });
    })
    .catch(next);
};

const logOut = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Выход' });
  } catch (err) {
    next(err);
  }
};

const getMe = (req, res, next) => {
  findUserById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getMe,
  logOut,
};

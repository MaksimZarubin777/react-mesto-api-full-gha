require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { celebrate } = require('celebrate');

const app = express();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const limiter = require('./limiter');
const { userRouter, cardRouter, userValidationSchema } = require('./routes/index');
const { login, createUser, logOut } = require('./controllers/users');
const auth = require('./middlewares/auth');
const config = require('./config');
const NotFoundError = require('./errors/NotFoundError');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleCors } = require('./middlewares/cors');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb ');

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(handleCors);
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', celebrate({
  body: userValidationSchema,
}), createUser);
app.post('/signin', celebrate({
  body: userValidationSchema,
}), login);
app.get('/signout', logOut);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at port ${config.port}`);
});

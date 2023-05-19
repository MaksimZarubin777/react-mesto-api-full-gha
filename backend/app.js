require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { celebrate } = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const limiter = require('./limiter');
const { userRouter, userValidationSchema } = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser, logOut } = require('./controllers/users');
const auth = require('./middlewares/auth');
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
app.post('/signup', celebrate({
  body: userValidationSchema,
}), createUser);
app.post('/signin', celebrate({
  body: userValidationSchema,
}), login);
app.get('/signout', logOut);
app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use(requestLogger);
app.use(errorLogger);
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errors());
app.use(errorsHandler);
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

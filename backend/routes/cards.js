const express = require('express');

const cardRouter = express.Router();
const { celebrate } = require('celebrate');
const { cardValidationSchema, cardIdValidationSchema } = require('./index');
const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', celebrate({ body: cardValidationSchema }), createCard);
cardRouter.delete('/:cardId', celebrate({ params: cardIdValidationSchema }), deleteCard);
cardRouter.put('/:cardId/likes', celebrate({ params: cardIdValidationSchema }), addCardLike);
cardRouter.delete('/:cardId/likes', celebrate({ params: cardIdValidationSchema }), removeCardLike);

module.exports = cardRouter;

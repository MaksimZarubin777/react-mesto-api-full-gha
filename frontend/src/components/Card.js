import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";


function Card( {card, onCardClick, onCardLike, onCardDelete} ) {
  function handleClick() {
    onCardClick(card)
  };

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card._id)
  }

  const currentUser = React.useContext(CurrentUserContext)
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `card__heart ${isLiked && 'card__heart_active'}` 
  );

  return(
    <div className="cards">
      <article className="card">
        {isOwn && <button className="card__trash" type="button" onClick={handleDeleteClick}/>}  
        <div className="card__img" onClick={handleClick} style={{ backgroundImage: `url(${card.link})`}}/>
        <div className="card__info">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-block">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <p className="card__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </article>
    </div>
  )
};

export default Card;
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main( {cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete} ) {
  const userData = React.useContext(CurrentUserContext)

  return (
    <main className="content">
    <section className="profile">
      <div className="profile__avatar-block">
        <div className="profile__avatar" onClick={onEditAvatar}  style={{ backgroundImage: `url(${userData.avatar})`}}/>
        <div className="profile__avatar-update"></div>
      </div>
      <div className="profile__info">
        <div className="profile__title">
          <h1 className="profile__text-title">{userData.name}</h1>
          <button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
        </div>
        <p className="profile__text-subtitle">{userData.about}</p>
      </div>
      <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
    </section>
    <section className="elements" aria-label="Места">
      {cards.map((card) => (
        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
      ))}
    </section>
  </main>
  )
};

export default Main;
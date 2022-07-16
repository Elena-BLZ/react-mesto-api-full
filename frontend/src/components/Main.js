import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="page__content">
      <section className="profile page__profile">
        <img
          src={currentUser && currentUser.avatar}
          alt="Аватар"
          className="profile__avatar"
        ></img>
        <button
          onClick={onEditAvatar}
          className="profile__avatar-btn"
          type="button"
          aria-label="Редактировать аватар"
        ></button>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser && currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-btn button"
              type="button"
              aria-label="Редактировать профиль"
            ></button>
          </div>
          <p className="profile__description">
            {currentUser && currentUser.about}
          </p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-btn button"
          type="button"
          aria-label="Добавить"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          const cardId = card._id;
          return (
            <Card
              key={cardId}
              ownerId={card.owner._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              cardData={card}
            />
          );
        }).reverse()}
      </section>
    </main>
  );
}

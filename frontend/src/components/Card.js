import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

//<Card name={card.name} link={card.link} likes={card.likes} key={card.id} onCardClick={onCardClick}/>
export default function Card({
  onCardClick,
  onCardLike,
  onCardDelete,
  cardData,
}) {
  const currentUser = useContext(CurrentUserContext);

  const card = {
    name: cardData.name,
    link: cardData.link,
  };

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = cardData.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__del-btn button ${
    !isOwn && "element__del-btn_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = cardData.likes.some((i) => i === currentUser._id);

  // // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-btn button ${
    isLiked && "element__like-btn_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  //function handleCardLike(id, isLiked)
  function handleLike() {
    onCardLike(cardData._id, isLiked);
  }

  function handleDelete() {
    onCardDelete(cardData._id);
  }
  return (
    <article className="element">
      <div className="element__photo-container">
        <img
          onClick={handleClick}
          className="element__photo button"
          src={cardData.link}
          alt={cardData.name}
        ></img>
        <button
          className={cardDeleteButtonClassName}
          type="button"
          aria-label="Удалить"
          onClick={handleDelete}
        ></button>
      </div>
      <div className="element__info">
        <h2 className="element__name">{cardData.name}</h2>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLike}
          type="button"
          aria-label="По нраву мне"
        ></button>
        <span className="element__like-count">{cardData.likes.length}</span>
      </div>
    </article>
  );
}

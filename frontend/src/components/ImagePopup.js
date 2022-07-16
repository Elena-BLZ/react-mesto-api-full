import React from "react";

export default function ImagePopup({ card, onClose }) {
  const isCard = Boolean(card);
  const className = `popup popup_type_picture ${isCard && "popup_opened"}`;

  return (
    <div className={className}>
      <div className="popup__container popup__container_type_picture">
        <button
          onClick={onClose}
          className="popup__close-btn button"
          type="button"
          aria-label="Закрыть"
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__picture"
            alt={isCard ? card.name : ""}
            src={isCard ? card.link : "#"}
          ></img>
          <figcaption className="popup__caption">
            {isCard ? card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

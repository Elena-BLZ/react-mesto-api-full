import React from "react";
import ok from "../images/ok.svg";
import notok from "../images/not-ok.svg";

export default function InfoTooltip({ isOpen, icon, text, onClose }) {
  return (
    <div className={`popup popup_type_info ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup_container_type_info">
        <button
          onClick={onClose}
          className="popup__close-btn button"
          type="button"
          aria-label="Закрыть"
        ></button>

        <img
          className="popup__icon"
          alt={text}
          src={icon === "ok" ? ok : notok}
        ></img>
        <p className="popup__info">{text}</p>
      </div>
    </div>
  );
}

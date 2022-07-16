import React from "react";
import { Link } from "react-router-dom";

export default function ({
  isLogged,
  linkTo,
  buttonText,
  handleExitClick,
  email,
}) {
  return (
    <div className="navbar">
      {isLogged && <p className="navbar__userinfo">{email}</p>}
      {!isLogged && (
        <Link to={linkTo} className="button navbar__link">
          {buttonText}
        </Link>
      )}
      {isLogged && (
        <button className="button navbar__button" onClick={handleExitClick}>
          Выйти
        </button>
      )}
    </div>
  );
}

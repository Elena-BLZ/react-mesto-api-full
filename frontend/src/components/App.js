import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import React, { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { Link } from "react-router-dom";
import * as auth from "../utils/Auth.js";

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] =
    React.useState(false);
  const [infoToolTip, setInfoToolTip] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null); //{name, link}

  const [currentUser, setCurrentUser] = React.useState(null);

  const [cardsData, setCardsData] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");

  function handleError(err) {
    setInfoPopup(false, err.message);
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getProfile()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(`Ошибка.....: ${err.message}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCardsData(res);
        })
        .catch((err) => console.log(`Ошибка.....: ${err.message}`));
    }
  }, [loggedIn]);

  function handleCardLike(id, isLiked) {
    api
      .changeLikeCardStatus(id, isLiked)
      .then((newCard) => {
        setCardsData((state) => state.map((c) => (c._id === id ? newCard : c)));
      })
      .catch((err) => handleError(err));
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCardsData((state) => state.filter((c) => c._id !== id));
      })
      .catch((err) => handleError(err));
  }



  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, description }) {
    api
      .editProfile(name, description)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => handleError(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar.link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => handleError(err));
  }

  function handleAddPlaceSubmit({ place, link }) {
    api
      .addCard(place, link)
      .then((newCard) => {
        setCardsData([...cardsData, newCard]);
        closeAllPopups();
      })
      .catch((err) => handleError(err));
  }

  function handleLogin(email, password) {
    return auth
      .signin(email, password)
      .then((data) => {
        if (data) {
          setEmail(email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => handleError(err));
  }

  const handleTokenCheck = () => {
    return auth
      .getContent()
      .then((res) => {
        if (res) {
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => console.log(`Ошибка.....: ${err.message}`));
  };

  function setInfoPopup(isOk, message) {
    const infoPopUp = isOk
      ? {
          isOpen: true,
          icon: "ok",
          text: message ? message : "Вы успешно зарегистрировались!",
          onClose: () => {
            history.push("/signin");
            setInfoToolTip({ ...infoToolTip, isOpen: false });
          },
        }
      : {
          isOpen: true,
          icon: "not-ok",
          text: message ? message : "Что-то пошло не так! Попробуйте ещё раз.",
          onClose: () => setInfoToolTip({ ...infoToolTip, isOpen: false }),
        };
    setInfoToolTip(infoPopUp);
  }

  const handleRegister = (email, password) => {
    return auth
      .signup(email, password)
      .then((res) => {
        setInfoPopup(true);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const signOut = () => {
    return auth
      .logOut()
      .then(() => {
        setLoggedIn(false);
        history.push("/signup");
      })
      .catch((err) => console.log(`Ошибка.....: ${err.message}`));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Switch>
            <Route path="/sign-in">
              <Header
                isLogged={loggedIn}
                linkTo="/sign-up"
                buttonText="Регистрация"
              />
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Header
                isLogged={loggedIn}
                linkTo="/sign-in"
                buttonText="Войти"
              />
              <Register handleRegister={handleRegister} />
              <span className="nav-span">
                Уже зарегистрированы?
                <Link to="/sign-in" className="button nav-span__link">
                  {" "}
                  Войти
                </Link>
              </span>
            </Route>
            <ProtectedRoute path="/" loggedIn={loggedIn}>
              <Header
                isLogged={loggedIn}
                email={email}
                handleExitClick={signOut}
              />
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cardsData}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </ProtectedRoute>
          </Switch>
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={infoToolTip.isOpen}
          icon={infoToolTip.icon}
          text={infoToolTip.text}
          onClose={infoToolTip.onClose}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

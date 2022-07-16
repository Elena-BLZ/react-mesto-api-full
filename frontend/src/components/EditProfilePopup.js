import React, { useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser&&isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="profile"
      formName="edit-profile-frm"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="edit-frm__item edit-frm__item_type_name"
        name="name"
        placeholder="Как вас зовут?"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      ></input>
      <span id="name-error" className="edit-frm__error-message"></span>
      <input
        type="text"
        className="edit-frm__item edit-frm__item_type_description"
        name="description"
        placeholder="Еще немного о себе."
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      ></input>
      <span id="description-error" className="edit-frm__error-message"></span>
    </PopupWithForm>
  );
}

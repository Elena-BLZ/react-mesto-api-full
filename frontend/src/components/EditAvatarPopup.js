import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const linkRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: linkRef.current.value,
    });
    linkRef.current.value = "";
  }

  useEffect (()=>{
    if (isOpen) {
      linkRef.current.value = "";
    }
  },[isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="avatar"
      formName="avatar-frm"
      title="Обновить аватар"
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="edit-frm__item edit-frm__item_type_link"
        name="avatar"
        placeholder="Ссылка на аватар"
        ref={linkRef}
        required
      ></input>
      <span id="avatar-error" className="edit-frm__error-message"></span>
    </PopupWithForm>
  );
}

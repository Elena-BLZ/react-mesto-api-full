import React from 'react'

export default function ConfirmPopup() {
  return (
    <div className="popup popup_type_confirm">
    <div className="popup__container">
      <button
        className="popup__close-btn button"
        type="button"
        aria-label="Закрыть"
      ></button>
      <form
        className="edit-frm edit-frm_type_confirm"
        name="confirm-frm"
        noValidate
      >
        <h2 className="edit-frm__heading">Вы уверены?</h2>
        <button className="edit-frm__save-btn button" type="submit">
          Да
        </button>
      </form>
    </div>
  </div>
  )
}

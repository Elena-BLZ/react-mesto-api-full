import React, { useState } from "react";

export default function AuthForm({ formName, header, buttonText, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError ("Нужен email и пароль");
      return;
    }
    onSubmit(email, password);
    setError ("");
  }

  return (
    <form
      className="auth-form"
      name={formName}
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="auth-form__header">{header}</h2>
      <input
        type="email"
        className="auth-form__input"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        required
      ></input>
      <input
        type="password"
        className="auth-form__input"
        placeholder="Пароль"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        required
      ></input>
      <span id="link-error" className="auth-form__error-message">
        {error}
      </span>
      <button className="auth-form__button button" type="submit">
        {buttonText}
      </button>
    </form>
  );
}

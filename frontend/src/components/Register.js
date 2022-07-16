import React from "react";
import AuthForm from "./AuthForm";

export default function Register({ handleRegister }) {
  return (
    <AuthForm
      formName="login-form"
      header="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleRegister}
    />
  );
}

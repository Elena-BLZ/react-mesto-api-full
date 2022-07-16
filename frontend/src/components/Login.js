import React from "react";
import AuthForm from "./AuthForm";

export default function Login({ handleLogin }) {
  return (
    <AuthForm
      formName="login-form"
      header="Вход"
      buttonText="Войти"
      onSubmit={handleLogin}
    />
  );
}

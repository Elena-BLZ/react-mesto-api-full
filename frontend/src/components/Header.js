import React from "react";
import logo from "../images/logo.svg";
import NavBar from "./NavBar";

export default function Header(props) {
  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип" className="logo header__logo"></img>
      <NavBar {...props}></NavBar>
    </header>
  );
}

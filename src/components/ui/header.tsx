import React from "react";

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo"><a style={{textDecoration: "none",color: "#fff"}} href="/">Homestay</a></h1>
      <ul className="nav-list">
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import "./_Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header_links container">
        <Link to="/">
          <a className="p-4 px-5 bg-success text-white">Pizzas</a>
        </Link>
        <Link to="/beverages">
          <a className="bg-white">Bebidas</a>
        </Link>
        <Link to="/desserts">
          <a className="p-4 px-5 bg-danger text-white">Postres</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;

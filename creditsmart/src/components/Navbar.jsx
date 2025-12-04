import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <h1 className="logo">
          <img
            src="/public/logo.png"
            width="80"
            style={{ verticalAlign: "middle", marginRight: "8px" }}
          />
          CreditSmart
        </h1>
        <ul className="menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/simulador">Simulador</Link></li>
          <li><Link to="/solicitar">Solicitar Crédito</Link></li>
        </ul>
      </div>
    </nav>
  );
}
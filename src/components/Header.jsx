import React from 'react';
import './Header.css';

const Header = ({ isAdmin, onLoginClick, onLogout }) => {
  return (
    <header className="junina-header">
      <div className="admin-badge-container">
        {isAdmin ? (
          <button className="admin-btn logged-in" onClick={onLogout}>
            Sair 🚪
          </button>
        ) : (
          <button className="admin-btn" onClick={onLoginClick}>
            Admin 🔑
          </button>
        )}
      </div>
      <div className="flags-container">
        <div className="flag yellow"></div>
        <div className="flag red"></div>
        <div className="flag green"></div>
        <div className="flag blue"></div>
        <div className="flag yellow"></div>
        <div className="flag red"></div>
        <div className="flag green"></div>
        <div className="flag blue"></div>
      </div>
      <div className="header-content">
        <h1>Arraiá da Empresa</h1>
        <p>Escolha o seu prato típico e participe da nossa festa!</p>
      </div>
    </header>
  );
};

export default Header;

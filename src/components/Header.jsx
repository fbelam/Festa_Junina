import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="junina-header">
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

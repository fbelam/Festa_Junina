import React, { useState, useEffect, useRef } from 'react';
import './AdminLoginModal.css';

const AdminLoginModal = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const usernameInputRef = useRef(null);

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Validação hardcoded
    if (username.trim() === 'mga' && password === 'mga1993@') {
      onLoginSuccess();
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content admin-login-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-icon">🔐</div>
          <h2>Área do Administrador</h2>
          <p className="modal-subtitle">Insira suas credenciais para gerenciar os pratos</p>
          
          <form onSubmit={handleSubmit}>
            {error && <div className="admin-error-banner">{error}</div>}
            
            <div className="input-group">
              <label htmlFor="admin-username">Usuário:</label>
              <input
                ref={usernameInputRef}
                type="text"
                id="admin-username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ex: mga"
              />
            </div>

            <div className="input-group">
              <label htmlFor="admin-password">Senha:</label>
              <input
                type="password"
                id="admin-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••"
              />
            </div>
            
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
              <button type="submit" className="confirm-btn admin-confirm-btn">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;

import React, { useState, useEffect, useRef } from 'react';
import './NameModal.css';

const NameModal = ({ dishName, onConfirm, onCancel }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, digite seu nome.');
      return;
    }
    onConfirm(name);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-icon">🤠</div>
          <h2>Eba! Você escolheu:</h2>
          <h3 className="modal-dish-name">{dishName}</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="participant-name">Digite seu nome para confirmar:</label>
              <input
                ref={inputRef}
                type="text"
                id="participant-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ex: João Silva"
                className={error ? 'error' : ''}
              />
              {error && <span className="error-message">{error}</span>}
            </div>
            
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
              <button type="submit" className="confirm-btn">Confirmar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NameModal;

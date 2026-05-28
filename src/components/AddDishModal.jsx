import React, { useState, useEffect, useRef } from 'react';
import './AddDishModal.css';

const AddDishModal = ({ onConfirm, onCancel }) => {
  const [dishName, setDishName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dishInputRef = useRef(null);

  useEffect(() => {
    if (dishInputRef.current) {
      dishInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = {};
    if (!dishName.trim()) {
      newErrors.dishName = 'Por favor, digite o nome do prato.';
    }
    if (!participantName.trim()) {
      newErrors.participantName = 'Por favor, digite seu nome.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm(dishName, participantName);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onCancel} disabled={isSubmitting}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-icon">🍳</div>
          <h2>Levar algo diferente!</h2>
          <p className="modal-subtitle">Sugira e confirme um novo prato para o arraiá</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="dish-name">Qual prato você vai trazer?</label>
              <input
                ref={dishInputRef}
                type="text"
                id="dish-name"
                value={dishName}
                onChange={(e) => {
                  setDishName(e.target.value);
                  if (errors.dishName) setErrors(prev => ({ ...prev, dishName: '' }));
                }}
                placeholder="Ex: Pinhão cozido, Maria mole, etc."
                className={errors.dishName ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.dishName && <span className="error-message">{errors.dishName}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="participant-name">Seu Nome:</label>
              <input
                type="text"
                id="participant-name"
                value={participantName}
                onChange={(e) => {
                  setParticipantName(e.target.value);
                  if (errors.participantName) setErrors(prev => ({ ...prev, participantName: '' }));
                }}
                placeholder="Ex: Maria Oliveira"
                className={errors.participantName ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.participantName && <span className="error-message">{errors.participantName}</span>}
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="confirm-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Salvando...' : 'Adicionar e Confirmar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDishModal;

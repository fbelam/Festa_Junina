import React from 'react';
import './DishCard.css';

const DishCard = ({ dish, onSelect, isAdmin, onDelete, onRelease }) => {
  const isSelected = dish.selecionado;

  return (
    <div className={`dish-card ${isSelected ? 'selected' : 'available'} ${isAdmin ? 'admin-mode' : ''}`}>
      <div className="dish-icon">
        {getIconForDish(dish.nome_prato)}
      </div>
      <div className="dish-info">
        <h3 className="dish-name">{dish.nome_prato}</h3>
        {isSelected ? (
          <div className="claimed-by">
            <span className="check-icon">✓</span> Trazido por: <strong>{dish.trazido_por}</strong>
          </div>
        ) : (
          <button className="select-btn" onClick={onSelect}>
            Eu trago!
          </button>
        )}

        {isAdmin && (
          <div className="admin-card-actions">
            {isSelected && (
              <button 
                className="admin-action-btn release-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  onRelease();
                }}
                title="Liberar prato"
              >
                🔓 Liberar
              </button>
            )}
            <button 
              className="admin-action-btn delete-btn" 
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Tem certeza que deseja excluir o prato "${dish.nome_prato}"?`)) {
                  onDelete();
                }
              }}
              title="Excluir prato"
            >
              🗑️ Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const getIconForDish = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('milho')) return '🌽';
  if (lowerName.includes('cachorro')) return '🌭';
  if (lowerName.includes('bolo')) return '🍰';
  if (lowerName.includes('pipoca')) return '🍿';
  if (lowerName.includes('vinho') || lowerName.includes('quentão')) return '🍷';
  if (lowerName.includes('refrigerante') || lowerName.includes('bebida')) return '🥤';
  if (lowerName.includes('arroz doce') || lowerName.includes('canjica')) return '🥣';
  if (lowerName.includes('paçoca') || lowerName.includes('pé de moleque')) return '🥜';
  return '🍽️';
};

export default DishCard;

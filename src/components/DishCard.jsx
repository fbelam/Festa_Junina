import React from 'react';
import './DishCard.css';

const DishCard = ({ dish, onSelect }) => {
  const isSelected = dish.selecionado;

  return (
    <div className={`dish-card ${isSelected ? 'selected' : 'available'}`}>
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

import React from 'react';
import { Deck } from '../hooks/useGameStore';

function Shop({ gameStore, onBack }) {
  const { currentGold, buyCard } = gameStore;

  return (
    <div className="main-shop">
      <h2>Bienvenido a la tienda de mercenarios.</h2>
      <h3>🪙 Oro disponible: {currentGold}</h3>
      <div className='shop' style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {Deck.map(card => (
          <div className='shop-card' key={card.id} style={{
            border: `2px solid #4d4b4bff`,
            padding: '0.5rem',
            width: '150px',
            backgroundImage: `url(${card.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px'
          }}>
            <h4>{card.name}</h4>
            <p><strong>Tipo:</strong> {card.type}</p>
            <p><strong>HP:</strong> {card.hp}</p>
            <p><strong>ATK:</strong> {card.attack}</p>
            <p><strong>DEF:</strong> {card.defense}</p>
            <p><small><strong>Habilidad:</strong> {card.ability}</small></p>
            <p>{card.price} gold</p>
            <button className='buy-button' style={{ marginTop: '0.5rem' }} onClick={() => buyCard(card)}>Comprar</button>
          </div>
        ))}
      </div>
      <button onClick={onBack}>Volver a la Batalla</button>
    </div>
  );
}

export default Shop;
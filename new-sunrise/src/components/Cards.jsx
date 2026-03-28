import React from 'react';
import { Deck } from '../hooks/useGameStore';

function Cards({ onBack }) {
  return (
    <div style={{ textAlign: 'center'}}>
      <h2>Ejército de Al'var</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
        {Deck.slice(0, 3).map(card => (
          <div key={card.id} style={{
            border: `2px solid #2E8B57`,
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
          </div>
        ))}
      </div>
      <button onClick={onBack} style={{ marginTop: '1rem' }}>
        Volver a la Batalla
      </button>
    </div>
  );
}

export default Cards;
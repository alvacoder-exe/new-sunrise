import React from 'react';

function MainMenu({ onMenuChange }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>New Sunrise - Menú Principal</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
        <button onClick={() => onMenuChange('battle')}>Nueva Batalla</button>
        <button onClick={() => onMenuChange('cards')}>Ver Cartas</button>
        <button onClick={() => onMenuChange('shop')}>Tienda</button>
        <button onClick={() => onMenuChange('lore')}>Historia</button>
      </div>
    </div>
  );
}

export default MainMenu;
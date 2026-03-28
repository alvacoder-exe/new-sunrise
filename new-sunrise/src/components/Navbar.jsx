import React from 'react';

function Navbar({ onMenuChange, isMaximized, onToggleMaximize, currentMenu }) {
  if (isMaximized) {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        background: '#2c3e50',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      }}
      onClick={onToggleMaximize}
      title="Abrir menú"
      >
        ☰
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: '#2c3e50',
      borderRadius: '10px',
      padding: '1rem',
      zIndex: 1000,
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      minWidth: '200px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ color: 'white', margin: 0 }}>Menú</h3>
        <button
          onClick={onToggleMaximize}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
          title="Minimizar"
        >
          ✕
        </button>
      </div>

      <div className="menu-button" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button
          onClick={() => onMenuChange('battle')}
          style={{
            background: currentMenu === 'battle' ? '#3498db' : '#34495e',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ⚔️ Batalla
        </button>
        <button
          onClick={() => onMenuChange('cards')}
          style={{
            background: currentMenu === 'cards' ? '#3498db' : '#34495e',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🃏 Mis Cartas
        </button>
        <button
          onClick={() => onMenuChange('shop')}
          style={{
            background: currentMenu === 'shop' ? '#3498db' : '#34495e',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🏪 Tienda
        </button>
        <button
          onClick={() => onMenuChange('lore')}
          style={{
            background: currentMenu === 'lore' ? '#3498db' : '#34495e',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          📖 Historia
        </button>
        <button
          onClick={() => onMenuChange('menu')}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '0.5rem'
          }}
        >
          🏠 Menú Principal
        </button>
      </div>
    </div>
  );
}

export default Navbar;
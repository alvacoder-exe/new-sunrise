import React from 'react';
import { ITEMS } from '../hooks/useGameStore';

function Inventory({ onBack, inventory }) {
  // Función para obtener el color según la rareza
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#8B8B8B';
      case 'rare': return '#4169E1';
      case 'epic': return '#9932CC';
      case 'legendary': return '#FFD700';
      default: return '#8B8B8B';
    }
  };

  // Función para obtener el emoji según la rareza
  const getRarityEmoji = (rarity) => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟡';
      default: return '⚪';
    }
  };

  // Función para obtener la descripción del objeto
  const getItemDescription = (itemName) => {
    const item = ITEMS.find(item => item.name === itemName);
    return item ? item.description : 'Objeto misterioso';
  };

  // Calcular estadísticas del inventario
  const totalItems = Object.values(inventory).reduce((sum, count) => sum + count, 0);
  const uniqueItems = Object.values(inventory).filter(count => count > 0).length;
  const legendaryItems = Object.entries(inventory).filter(([name, count]) => {
    const item = ITEMS.find(item => item.name === name);
    return item && item.rarity === 'legendary' && count > 0;
  }).length;

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h2>📦 Inventario de Objetos</h2>

      {/* Estadísticas del inventario */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '8px',
          border: '2px solid #ddd'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
            {totalItems}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            Total de Objetos
          </div>
        </div>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '8px',
          border: '2px solid #ddd'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
            {uniqueItems}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            Objetos Únicos
          </div>
        </div>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '8px',
          border: '2px solid #FFD700',
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700' }}>
            {legendaryItems}
          </div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            Legendarios
          </div>
        </div>
      </div>

      {/* Grid de objetos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {Object.entries(inventory).map(([itemName, count]) => {
          // Encontrar el item en la lista de ITEMS para obtener su rareza
          const itemData = ITEMS.find(item => item.name === itemName) || { rarity: 'common' };
          const rarity = itemData.rarity || 'common';

          return (
            <div key={itemName} style={{
              border: `3px solid ${getRarityColor(rarity)}`,
              borderRadius: '12px',
              padding: '1.5rem',
              backgroundImage: `url(${itemData.image})`,
              backgroundSize: 'cover',
              opacity: count > 0 ? 1 : 0.6,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: count > 0 ? 'pointer' : 'default',
              position: 'relative',
              minHeight: '120px',            
            }}
            onMouseEnter={(e) => {
              if (count > 0) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = `0 4px 20px rgba(0,0,0,0.1), 0 0 15px ${getRarityColor(rarity)}40`;
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            >
              {/* Efecto de rareza legendaria */}
              {rarity === 'legendary' && count > 0 && (
                <div className="drop-container" style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  background: `linear-gradient(45deg, ${getRarityColor(rarity)}, #FFA500, ${getRarityColor(rarity)})`,
                  borderRadius: '14px',
                  zIndex: -1,
                  opacity: 0.3,
                  animation: 'glow 2s ease-in-out infinite alternate'
                }} />
              )}

              <div style={{
                fontSize: '2rem',
                marginBottom: '0.5rem',
                filter: count === 0 ? 'grayscale(100%)' : 'none'
              }}>
                {getRarityEmoji(rarity)}
              </div>

              <h4 style={{
                margin: '0.5rem 0',
                color: count > 0 ? '#333' : '#ffffff',
                fontSize: '1.1rem',
                textShadow: '#00000020 10px 10px 20px'             
              }}>
                {itemName}
              </h4>

              <p style={{
                margin: '0.5rem 0',
                color: count > 0 ? '#666' : '#ffffff',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                textShadow: '#00000020 5px 5px 10px'
              }}>
                {getItemDescription(itemName)}
              </p>

              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: count > 0 ? getRarityColor(rarity) : '#ffffff',
                marginTop: '0.5rem'
              }}>
                {count > 0 ? count : 0}
              </div>

              {count === 0} 

              {/* Indicador de rareza */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: getRarityColor(rarity),
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                {rarity}
              </div>
            </div>
          );
        })}
      </div>


     

      <button onClick={onBack} style={{
        marginTop: '2rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease'
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        ← Volver al Menú
      </button>

      {/* Estilos CSS para la animación de glow */}
      <style>
        {`
          @keyframes glow {
            from { opacity: 0.3; }
            to { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
}

export default Inventory;
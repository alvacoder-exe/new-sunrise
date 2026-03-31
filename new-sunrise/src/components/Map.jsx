import React from 'react';
import { Enemies } from '../hooks/useGameStore';

function Map({ currentEnemyIndex, defeatedEnemies, onBack, onStartBattle }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Mapa de Enemigos</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '40vw', margin: '0 auto' }}>
        {Enemies.map((enemy, index) => {
          const isDefeated = defeatedEnemies.includes(index);
          const isCurrent = index === currentEnemyIndex;
          return (
            <div
              key={enemy.id}
              onClick={() => !isDefeated && onStartBattle(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                border: `2px solid ${isCurrent ? '#3498db' : isDefeated ? '#27ae60' : '#4d4d4d'}`,
                borderRadius: '10px',
                background: isCurrent ? '#484949' : isDefeated ? '#414141' : '#131313',
                opacity: isDefeated ? 0.7 : 1,
                cursor: isDefeated ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <img
                src={enemy.image}
                alt={enemy.name}
                style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '1rem' }}
              />
              <div style={{ textAlign: 'left', flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{enemy.name}</h3>
                <p style={{ margin: '0', color: '#666' }}>{enemy.description}</p>
                <p style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>
                  Tier {enemy.tier} - Recompensa: {enemy.reward} oro
                </p>
              </div>
              {isCurrent && (
                <div style={{ color: '#3498db', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  ¡Próximo Enemigo!
                </div>
              )}
              {isDefeated && (
                <div style={{ color: '#27ae60', fontWeight: 'bold' }}>
                  ✓ Derrotado
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={onBack} style={{ marginTop: '2rem' }}>Volver</button>
    </div>
  );
}

export default Map;
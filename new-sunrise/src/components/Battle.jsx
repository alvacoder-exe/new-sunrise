import React from 'react';

function Battle({ gameStore }) {
  const {
    playerField,
    enemyField,
    turn,
    selectedAttacker,
    log,
    gameOver,
    playerStone,
    enemyStone,
    setSelectedAttacker,
    playerAttackTarget,
    getFactionColor,
  } = gameStore;

  return (
    <div className="game-tab" style={{ padding: '1rem', background: '#282828ff', borderRadius: '8px', color: 'white' }}>
      <div className="factions-life" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div className="faction">
          <h3 style={{ color: getFactionColor("Al'var") }}>Al'var - Semilla Ancestral</h3>
          <div style={{
            background: '#2E8B57',
            height: '20px',
            width: '200px',
            border: '1px solid #000'
          }}>
            <div style={{
              background: '#90EE90',
              height: '100%',
              width: `${(playerStone.growth / playerStone.maxGrowth) * 100}%`,
              transition: 'width 0.3s'
            }}></div>
          </div>
          <small>Crecimiento: {playerStone.growth}/{playerStone.maxGrowth}</small>
        </div>

        <div className="faction">
          <h3 style={{ color: getFactionColor("Mat'ais") }}>Mat'ais - Núcleo de Voluntad</h3>
          <div style={{
            background: '#B22222',
            height: '20px',
            width: '200px',
            border: '1px solid #000'
          }}>
            <div style={{
              background: '#FF4500',
              height: '100%',
              width: `${(enemyStone.charge / enemyStone.maxCharge) * 100}%`,
              transition: 'width 0.3s'
            }}></div>
          </div>
          <small>Carga: {enemyStone.charge}/{enemyStone.maxCharge}</small>
        </div>
      </div>
      <p><strong>Turno:</strong> {turn === 'player' ? "Al'var" : "Mat'ais"}</p>
      <div className="faction-name" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ color: getFactionColor("Al'var") }}>Reino de Al'var</h2>
        <h2 style={{ color: getFactionColor("Mat'ais") }}>Reino de Mat'ais</h2>
      </div>
      <div className="gameboard" style={{ display: 'flex' }}>
        <div className="player-field">
          {playerField.map(card => (
            <div className="player-field-card"
              key={card.id}
              style={{
                border: `2px solid rgb(29, 128, 29)`,
                padding: '0.5rem',
                width: '150px',
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px'
              }}
            >
              <h4>{card.name}</h4>
              <p><strong>HP:</strong> {card.hp}</p>
              <p><strong>ATK:</strong> {card.attack}</p>
              <p><strong>DEF:</strong> {card.defense}</p>
              <p><small><strong>Habilidad:</strong> {card.ability}</small></p>
              {turn === 'player' && !gameOver && (
                <button className="player-attack-button"
                  onClick={() => setSelectedAttacker(card.id)}
                  style={{
                    background: selectedAttacker === card.id ? '#2E8B57' : '#ccc',
                    color: selectedAttacker === card.id ? 'white' : 'black',
                    bottom: '10px',
                    left: '10px',
                    padding: '0.3rem 0.6rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {selectedAttacker === card.id ? "Seleccionado" : "Seleccionar"}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className='enemy-field'>
          {enemyField.map(card => (
            <div className="enemy-field-card"
              key={card.id}
              style={{
                border: '2px solid rgb(172, 34, 34)',
                padding: '0.5rem',
                width: '150px',
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px'
              }}
            >
              <h4>{card.name}</h4>
              <p><strong>HP:</strong> {card.hp}</p>
              <p><strong>ATK:</strong> {card.attack}</p>
              <p><strong>DEF:</strong> {card.defense}</p>
              <p><small><strong>Habilidad:</strong> {card.ability}</small></p>
              {turn === 'player' && selectedAttacker !== null && !gameOver && (
                <button
                  onClick={() => {
                    playerAttackTarget(selectedAttacker, card.id);
                    setSelectedAttacker(null);
                  }}
                  style={{
                    background: '#B22222',
                    color: 'white',
                    padding: '0.3rem 0.6rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  ¡Atacar!
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <h2>Registro de Batalla</h2>
      <div style={{
        border: '1px solid #ccc',
        height: '150px',
        overflowY: 'auto',
        padding: '0.5rem',
        background: '#313131ff',
        borderRadius: '4px'
      }}>
        {log.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center' }}>La batalla aún no comienza...</p>
        ) : (
          log.map((entry, i) => (
            <div key={i} style={{
              padding: '2px 0',
              borderBottom: i === 0 ? '2px solid #666' : '1px solid #eee'
            }}>
              {entry}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Battle;
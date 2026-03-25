import React, { useState } from "react";
import Lore from "./Lore";

// Cartas temáticas para New Sunrise
const alvarDeck = [
  { id: 1, name: "Guardabosque Al'var", type: "Guerrero", faction: "Al'var", attack: 8, defense: 12, hp: 15, ability: "+2 DEF en bosques" },
  { id: 2, name: "Druida de las Runas", type: "Mago", faction: "Al'var", attack: 12, defense: 6, hp: 10, ability: "Cura 3 HP aliado" },
  { id: 3, name: "Espíritu del Bosque", type: "Criatura", faction: "Al'var", attack: 10, defense: 8, hp: 12, ability: "Esquivar primer ataque" },
  { id: 4, name: "Sabio Ancestral", type: "Mago", faction: "Al'var", attack: 6, defense: 10, hp: 14, ability: "Robar carta extra" },
  { id: 5, name: "Guerrero Rúnico", type: "Guerrero", faction: "Al'var", attack: 14, defense: 9, hp: 13, ability: "Ataque extra a golems" },
];

const mataisDeck = [
  { id: 6, name: "Soldado de Mat'ais", type: "Guerrero", faction: "Mat'ais", attack: 12, defense: 7, hp: 12, ability: "+2 ATK primera ronda" },
  { id: 7, name: "Ingeniero de Guerra", type: "Técnico", faction: "Mat'ais", attack: 9, defense: 11, hp: 11, ability: "Reparar 5 HP aliado" },
  { id: 8, name: "Golem de Escoria", type: "Máquina", faction: "Mat'ais", attack: 15, defense: 13, hp: 16, ability: "Ignora 3 DEF" },
  { id: 9, name: "Artillero de Vapor", type: "Técnico", faction: "Mat'ais", attack: 13, defense: 5, hp: 10, ability: "Daño área 2" },
  { id: 10, name: "Asalto Sombrío", type: "Guerrero", faction: "Mat'ais", attack: 11, defense: 8, hp: 11, ability: "Ataque rápido" },
];

// Piedras Rúnicas
const runicStones = {
  alvar: { name: "Semilla Ancestral", growth: 0, maxGrowth: 10, ability: "Invoca Espíritu Guardián" },
  matais: { name: "Núcleo de Voluntad", charge: 0, maxCharge: 8, ability: "Rayo Devastador" }
};

function getInitialHand(deck) {
  // Mejor función para obtener mano inicial
  const shuffled = [...deck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map(card => ({ ...card }));
}



function Navbar({ onMenuChange, isMinimized, onToggleMinimize, currentMenu }) {
  if (isMinimized) {
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
      onClick={onToggleMinimize}
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
      gap: '0.5rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ color: 'white', margin: 0 }}>Menú</h3>
        <button 
          onClick={onToggleMinimize}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
          title="Minimizar"
        >
          ➖
        </button>
      </div>
      
      <div className="menu-button"/*style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}*/>
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

export default function App() { 
  const [playerField, setPlayerField] = useState(() => getInitialHand(alvarDeck));
  const [enemyField, setEnemyField] = useState(() => getInitialHand(mataisDeck));
  const [turn, setTurn] = useState('player');
  const [selectedAttacker, setSelectedAttacker] = useState(null);
  const [log, setLog] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [menu, setMenu] = useState('battle');
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [playerStone, setPlayerStone] = useState({ ...runicStones.alvar });
  const [enemyStone, setEnemyStone] = useState({ ...runicStones.matais });
  const [navbarMinimized, setNavbarMinimized] = useState(false);

  // DEBUG: Mostrar estado actual en consola
  React.useEffect(() => {
    console.log("=== ESTADO ACTUAL ===");
    console.log("Player Field:", playerField);
    console.log("Enemy Field:", enemyField);
    console.log("Turn:", turn);
    console.log("Selected Attacker:", selectedAttacker);
    console.log("Game Over:", gameOver);
    console.log("=====================");
  }, [playerField, enemyField, turn, selectedAttacker, gameOver]);

  function addLog(message) { 
    setLog(prev => [`[Turno ${turn}] ${message}`, ...prev].slice(0, 20)); 
  }

 /* function checkGameOver() {
    if (playerField.length === 0) {
      setGameOver(true);
      setGameOverMessage("¡El Reino de Mat'ais prevalece! La tecnología domina sobre la naturaleza.");
    } else if (enemyField.length === 0) {
      setGameOver(true);
      setGameOverMessage("¡El Reino de Al'var triunfa! La sabiduría ancestral renace.");
    }
  } */

  function updateRunicStone(attackerFaction) {
    if (attackerFaction === "Al'var") {
      setPlayerStone(prev => {
        const newGrowth = Math.min(prev.growth + 2, prev.maxGrowth);
        if (newGrowth === prev.maxGrowth) {
          addLog("¡La Semilla Ancestral florece! Espíritu Guardián invocado!");
        }
        return { ...prev, growth: newGrowth };
      });
    } else {
      setEnemyStone(prev => {
        const newCharge = Math.min(prev.charge + 3, prev.maxCharge);
        if (newCharge === prev.maxCharge) {
          addLog("¡El Núcleo de Voluntad se sobrecarga! ¡Peligro inminente!");
        }
        return { ...prev, charge: newCharge };
      });
    }
  }

  function attack(attacker, target, isPlayer) {
    console.log("Ataque ejecutado:", { attacker: attacker.name, target: target.name, isPlayer });
    
    let damage = attacker.attack - target.defense;
    if (damage < 1) damage = 1;

    const newTarget = { ...target, hp: target.hp - damage };
    addLog(`${attacker.name} (${attacker.faction}) ataca a ${target.name} por ${damage} daño!`);

    // Actualizar piedra rúnica
    updateRunicStone(attacker.faction);

    let newPlayerField = [...playerField];
    let newEnemyField = [...enemyField];

    if (newTarget.hp <= 0) {
      addLog(`¡${target.name} ha sido destruid${target.type === 'Máquina' ? 'a' : 'o'}!`);
      if (isPlayer) {
        newEnemyField = enemyField.filter(c => c.id !== target.id);
        setEnemyField(newEnemyField);
      } else {
        newPlayerField = playerField.filter(c => c.id !== target.id);
        setPlayerField(newPlayerField);
      }
    } else {
      if (isPlayer) {
        newEnemyField = enemyField.map(c => c.id === target.id ? newTarget : c);
        setEnemyField(newEnemyField);
      } else {
        newPlayerField = playerField.map(c => c.id === target.id ? newTarget : c);
        setPlayerField(newPlayerField);
      }
    }

    // Revisar fin del juego después de actualizar los estados
    setTimeout(() => {
      if (newPlayerField.length === 0) {
        setGameOver(true);
        setGameOverMessage("¡El Reino de Mat'ais prevalece! La tecnología domina sobre la naturaleza.");
      } else if (newEnemyField.length === 0) {
        setGameOver(true);
        setGameOverMessage("¡El Reino de Al'var triunfa! La sabiduría ancestral renace.");
      }
    }, 100);
  }

  function playerAttackTarget(attackerId, targetId) {
    if (turn !== 'player' || gameOver) return;

    const attacker = playerField.find(c => c.id === attackerId);
    const target = enemyField.find(c => c.id === targetId);
    
    console.log("Player attack:", { attacker, target });
    
    if (!attacker || !target) {
      console.error("No se encontró atacante o objetivo");
      return;
    }

    attack(attacker, target, true);
    setTurn('enemy');
    setTimeout(enemyPlay, 1500);
  }

  function enemyPlay() {
    if (enemyField.length === 0 || playerField.length === 0 || gameOver) return;
    
    const attacker = enemyField[Math.floor(Math.random() * enemyField.length)];
    const target = playerField[Math.floor(Math.random() * playerField.length)];
    
    console.log("Enemy attack:", { attacker: attacker.name, target: target.name });
    
    attack(attacker, target, false);
    setTurn('player');
  }

  function resetGame() {
    setPlayerField(getInitialHand(alvarDeck));
    setEnemyField(getInitialHand(mataisDeck));
    setTurn('player');
    setSelectedAttacker(null);
    setLog([]);
    setGameOver(false);
    setMenu('battle');
    setGameOverMessage("");
    setPlayerStone({ ...runicStones.alvar });
    setEnemyStone({ ...runicStones.matais });
  }

  function getFactionColor(faction) {
    return faction === "Al'var" ? "#2E8B57" : "#B22222";
  }

  function handleMenuChange(newMenu) {
    setMenu(newMenu);
    if (gameOver && newMenu !== 'battle') {
    setGameOver(false);
    }
  }

 function renderBattle() {
    return (
      <div className="game-tab">
        <div className="factions-life">
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

        <h2 style={{ color: getFactionColor("Al'var") }}>Reino de Al'var</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {playerField.map(card => (
            <div
              key={card.id}
              style={{
                border: `2px solid ${getFactionColor(card.faction)}`,
                padding: '0.5rem',
                width: '150px',
                background: '#506e50ff',
                borderRadius: '8px'
              }}
            >
              <h4>{card.name}</h4>
              <p><strong>HP:</strong> {card.hp}</p>
              <p><strong>ATK:</strong> {card.attack}</p>
              <p><strong>DEF:</strong> {card.defense}</p>
              <p><small><strong>Habilidad:</strong> {card.ability}</small></p>
              {turn === 'player' && !gameOver && (
                <button 
                  onClick={() => setSelectedAttacker(card.id)}
                  style={{
                    background: selectedAttacker === card.id ? '#2E8B57' : '#ccc',
                    color: selectedAttacker === card.id ? 'white' : 'black',
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

        <h2 style={{ color: getFactionColor("Mat'ais") }}>Reino de Mat'ais</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {enemyField.map(card => (
            <div
              key={card.id}
              style={{
                border: `2px solid ${getFactionColor(card.faction)}`,
                padding: '0.5rem',
                width: '150px',
                background: '#883939ff',
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

  function renderMenu() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>New Sunrise - Menú Principal</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
          <button onClick={() => handleMenuChange('battle')}>Nueva Batalla</button>
          <button onClick={() => handleMenuChange('cards')}>Ver Cartas</button>
          <button onClick={() => handleMenuChange('shop')}>Tienda</button>
          <button onClick={() => handleMenuChange('lore')}>Historia</button>
        </div>
      </div>
    );
  }

  function renderCards() {
    return (
      <div>
        <h2>Ejército de Al'var</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
          {alvarDeck.map(card => (
            <div key={card.id} style={{ 
              border: `2px solid ${getFactionColor(card.faction)}`,
              padding: '0.5rem', 
              width: '150px',
              background: '#4d4b4bff',
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
        <button onClick={() => setMenu('battle')} style={{ marginTop: '1rem' }}>
          Volver a la Batalla
        </button>
      </div>
    );
  }

  function renderShop() {
    return (
      <div>
        <h2>Mercado de los Ecos</h2>
        <p>Intercambia recursos por nuevos guerreros para tu ejército.</p>
        <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <h3>Cartas Disponibles</h3>
          <p>🏷️ Guerrero Élite - 50 recursos</p>
          <p>🏷️ Mago Runico - 75 recursos</p>
          <p>🏷️ Golem Defensivo - 60 recursos</p>
          <button disabled>Próximamente...</button>
        </div>
        <button onClick={() => setMenu('battle')}>Volver a la Batalla</button>
      </div>
    );
  }

  return (
  <div style={{ padding: '1rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
    <Navbar 
      onMenuChange={handleMenuChange}
      isMinimized={navbarMinimized}
      onToggleMinimize={() => setNavbarMinimized(!navbarMinimized)}
      currentMenu={menu}
    />

    {/* Contenido principal con margen dinámico */}
    <div style={{ 
      marginTop: navbarMinimized ? '60px' : '180px',
      transition: 'margin-top 0.3s ease'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>🌄 New Sunrise: La Guerra de Tabak</h1>
        <p style={{ color: '#666' }}>Al'var vs Mat'ais - La batalla por el futuro</p>
      </header>

      {gameOver ? (
        <div style={{ textAlign: 'center' }}>
          <h2>{gameOverMessage}</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button onClick={() => handleMenuChange('cards')}>Ver Ejército</button>
            <button onClick={() => handleMenuChange('lore')}>Conocer la Historia</button>
            <button onClick={() => resetGame()}>Nueva Batalla</button>
          </div>
        </div>
      ) : menu === 'battle' ? (
        renderBattle()
      ) : menu === 'cards' ? (
        renderCards()
      ) : menu === 'shop' ? (
        renderShop()
      ) : menu === 'lore' ? (
        <Lore onBack={() => handleMenuChange('battle')} />
      ) : (
        renderMenu()
      )}
    </div>
  </div>
);
}
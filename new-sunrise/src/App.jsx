import React, { useState } from "react";

const initialDeck = [
{ id: 1, name: "Guerrero Novato", type: "Guerrero", attack: 10, defense: 5, hp: 10 },
{ id: 2, name: "Guerrero de Hierro", type: "Guerrero", attack: 15, defense: 10, hp: 15 },
{ id: 3, name: "Guerrero Veloz", type: "Guerrero", attack: 8, defense: 3, hp: 8 },
{ id: 4, name: "Guerrero Fénix", type: "Guerrero", attack: 25, defense: 15, hp: 20 },
{ id: 5, name: "Guerrero Arcano", type: "Guerrero", attack: 18, defense: 8, hp: 12 },
{ id: 6, name: "Guerrero Real", type: "Guerrero", attack: 20, defense: 10, hp: 15 },
{ id: 7, name: "Guerrero Fantasma", type: "Guerrero", attack: 30, defense: 5, hp: 10 },
{ id: 8, name: "Guerrero Sombrío", type: "Guerrero", attack: 22, defense: 12, hp: 14 },
{ id: 9, name: "Guerrero Rúnico", type: "Guerrero", attack: 16, defense: 14, hp: 12 },
{ id: 10, name: "Guerrero Antiguo", type: "Guerrero", attack: 28, defense: 18, hp: 18 },
];

function getInitialHand() {
return initialDeck.slice(0, 5).map(c => ({ ...c }));
}

export default function App() { 
const [playerField, setPlayerField] = useState(getInitialHand());
const [enemyField, setEnemyField] = useState(getInitialHand());
const [turn, setTurn] = useState('player');
const [selectedAttacker, setSelectedAttacker] = useState(null);
const [log, setLog] = useState([]);
const [gameOver, setGameOver] = useState(false);
const [menu, setMenu] = useState('battle');
const [gameOverMessage, setGameOverMessage] = useState("");

function addLog(message) { setLog(prev => [message, ...prev].slice(0, 20)); }

function attack(attacker, target, isPlayer) {
    let damage = attacker.attack - target.defense;
    if (damage < 1) damage = 1;
    const newTarget = { ...target, hp: target.hp - damage };
    addLog(`${attacker.name} ataca a ${target.name} por ${damage} daño!`);
    if (newTarget.hp <= 0) {
      addLog(`${target.name} ha sido destruida!`);
      if (isPlayer) setEnemyField(prev => prev.filter(c => c.id !== target.id));
      else setPlayerField(prev => prev.filter(c => c.id !== target.id));
    } else {
      if (isPlayer) setEnemyField(prev => prev.map(c => c.id === target.id ? newTarget : c));
      else setPlayerField(prev => prev.map(c => c.id === target.id ? newTarget : c));
    }
    setTimeout(checkGameOver, 100);
}

function checkGameOver() {
  if (playerField.length === 0) {
    setGameOver(true);
    setGameOverMessage("¡Derrota! Todas tus cartas han sido destruidas.");
  } else if (enemyField.length === 0) {
    setGameOver(true);
    setGameOverMessage("¡Victoria! Has destruido todas las cartas enemigas.");
  }
}

function attack(attacker, target, isPlayer) {
  let damage = attacker.attack - target.defense;
  if (damage < 1) damage = 1;

  const newTarget = { ...target, hp: target.hp - damage };
  addLog(`${attacker.name} ataca a ${target.name} por ${damage} daño!`);

  let newPlayerField = [...playerField];
  let newEnemyField = [...enemyField];

  if (newTarget.hp <= 0) {
    addLog(`${target.name} ha sido destruida!`);
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

  // Revisar game over con los **nuevos arrays** directamente
  if (newPlayerField.length === 0) {
    setGameOver(true);
    setGameOverMessage("¡Derrota! Todas tus cartas han sido destruidas.");
  } else if (newEnemyField.length === 0) {
    setGameOver(true);
    setGameOverMessage("¡Victoria! Has destruido todas las cartas enemigas.");
  }
}

function playerAttackTarget(attackerId, targetId) {
  if (turn !== 'player' || gameOver) return;

  const attacker = playerField.find(c => c.id === attackerId);
  const target = enemyField.find(c => c.id === targetId);
  if (!attacker || !target) return;

  attack(attacker, target, true);

  setTurn('enemy');
  setTimeout(enemyPlay, 1000);
}

function enemyPlay() {
if (enemyField.length === 0 || playerField.length === 0 || gameOver) return;
const attacker = enemyField[Math.floor(Math.random() * enemyField.length)];
const target = playerField[Math.floor(Math.random() * playerField.length)];
attack(attacker, target, false);
setTurn('player');
}


function resetGame() {
setPlayerField(getInitialHand());
setEnemyField(getInitialHand());
setTurn('player');
setSelectedAttacker(null);
setLog([]);
setGameOver(false);
setMenu('battle');
}


function renderBattle() {
  return (
    <>
      <p><strong>Turno:</strong> {turn}</p>

      <h2>Campo del Jugador</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {playerField.map(card => (
          <div
            key={card.id}
            style={{
              border: selectedAttacker === card.id ? '2px solid green' : '1px solid gray',
              padding: '0.5rem',
              width: '150px'
            }}
          >
            <h3>{card.name}</h3>
            <p>HP: {card.hp}</p>
            <p>ATK: {card.attack} DEF: {card.defense}</p>
            {turn === 'player' && !gameOver && (
              <button onClick={() => setSelectedAttacker(card.id)}>
                {selectedAttacker === card.id ? "Atacante seleccionado" : "Seleccionar atacante"}
              </button>
            )}
          </div>
        ))}
      </div>

      <h2>Campo del Enemigo</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {enemyField.map(card => (
          <div
            key={card.id}
            style={{
              border: '1px solid red',
              padding: '0.5rem',
              width: '150px'
            }}
          >
            <h3>{card.name}</h3>
            <p>HP: {card.hp}</p>
            <p>ATK: {card.attack} DEF: {card.defense}</p>
            {turn === 'player' && selectedAttacker !== null && !gameOver && (
              <button
                onClick={() => {
                  playerAttackTarget(selectedAttacker, card.id);
                  setSelectedAttacker(null);
                }}
              >
                Atacar
              </button>
            )}
          </div>
        ))}
      </div>

      <h2>Registro</h2>
      <div style={{ border: '1px solid black', height: '150px', overflowY: 'auto', padding: '0.5rem' }}>
        {log.map((entry, i) => <div key={i}>{entry}</div>)}
      </div>
    </>
  );  
}

function renderMenu() {
return (
<div>
<h2>Menú Principal</h2>
<button onClick={() => setMenu('cards')}>Ver Mis Cartas</button>
<button onClick={() => setMenu('shop')}>Tienda de Cartas</button>
<button onClick={() => setMenu('lore')}>Leer Lore</button>
<button onClick={() => resetGame()}>Nueva Batalla</button>
</div>
);
}


function renderCards() {
return (
<div>
<h2>Mis Cartas</h2>
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
{playerField.map(card => (
<div key={card.id} style={{ border: '1px solid gray', padding: '0.5rem', width: '150px' }}>
<h3>{card.name}</h3>
<p>HP: {card.hp}</p>
<p>ATK: {card.attack} DEF: {card.defense}</p>
</div>
))}
</div>
<button onClick={() => setMenu('battle')}>Volver a la Batalla</button>
</div>
);
}


function renderShop() {
return (
<div>
<h2>Tienda de Cartas (Prototipo)</h2>
<p>Aquí podrás comprar nuevas cartas en el futuro.</p>
<button onClick={() => setMenu('battle')}>Volver a la Batalla</button>
</div>
);
}


function renderLore() {
return (
<div>
<h2>Lore del Juego</h2>
<p>En un mundo donde los guerreros y la magia conviven, cada batalla decide quién dominará los reinos.</p>
<button onClick={() => setMenu('battle')}>Volver a la Batalla</button>
</div>
);
}


return (
  <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
    <h1>⚔️ Juego de Cartas: Turnos y Combate</h1>

    {gameOver ? (
      <div>
        <h2>{gameOverMessage}</h2>
        <button onClick={() => setMenu('cards')}>Ver Mis Cartas</button>
        <button onClick={() => setMenu('shop')}>Tienda de Cartas</button>
        <button onClick={() => setMenu('lore')}>Leer Lore</button>
        <button onClick={() => resetGame()}>Nueva Batalla</button>
      </div>
    ) : menu === 'battle' ? (
      renderBattle()
    ) : menu === 'cards' ? (
      renderCards()
    ) : menu === 'shop' ? (
      renderShop()
    ) : (
      renderLore()
    )}
  </div>
);
}

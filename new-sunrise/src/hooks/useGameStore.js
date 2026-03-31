import { useState, useEffect } from 'react';

// Sistema de Objetos con Rarezas
export const ITEMS = [
  // Comunes (60% probabilidad)
  { id: 'diorita', name: 'Diorita', rarity: 'common', description: 'Piedra resistente para construcciones', probability: 25, image: "https://i.pinimg.com/736x/d0/f4/52/d0f4524768fa550d49cbec515bb06dd3.jpg" },
  { id: 'marmol', name: 'Mármol', rarity: 'common', description: 'Piedra elegante para decoraciones', probability: 20, image: "https://i.pinimg.com/1200x/01/19/ee/0119eea295d61bb70f664cae900b0bf8.jpg" },
  { id: 'madera', name: 'Madera', rarity: 'common', description: 'Material básico para construcciones', probability: 15, image: "https://i.pinimg.com/736x/fe/5e/f8/fe5ef8400740daf798a7f7b526b19839.jpg" },

  // Raros (30% probabilidad)
  { id: 'cristal', name: 'Cristal', rarity: 'rare', description: 'Cristal mágico con propiedades especiales', probability: 15, image: "https://i.pinimg.com/736x/73/2d/22/732d226d905778502c13719b2e490263.jpg" },
  { id: 'acero', name: 'Acero', rarity: 'rare', description: 'Metal resistente y duradero', probability: 10, image: "https://i.pinimg.com/736x/ef/77/69/ef7769a175bbec0c7df7db722c78e9f5.jpg" },
  { id: 'cuero', name: 'Cuero', rarity: 'rare', description: 'Material flexible para armaduras', probability: 5, image: "https://i.pinimg.com/1200x/4b/a3/66/4ba366cf29f42c263c7d5237d156fd0a.jpg" },

  // Épicos (8% probabilidad)
  { id: 'obsidiana', name: 'Obsidiana', rarity: 'epic', description: 'Piedra volcánica con poderes místicos', probability: 4, image: "https://i.pinimg.com/736x/04/a2/27/04a227dbcb17ad3abc3ee0cac4023745.jpg" },
  { id: 'mithril', name: 'Mithril', rarity: 'epic', description: 'Metal legendario extremadamente ligero', probability: 3, image: "https://i.pinimg.com/736x/7f/7e/1d/7f7e1d43f94068c6d037db53a5a113f0.jpg" },
  { id: 'diamante', name: 'Diamante', rarity: 'epic', description: 'Gema más dura conocida', probability: 1, image: "https://i.pinimg.com/1200x/70/6a/f8/706af88959a53b08c4d3a87fc686adc7.jpg" },

  // Legendarios (2% probabilidad)
  { id: 'adamantita', name: 'Adamantita', rarity: 'legendary', description: 'Metal indestructible de los antiguos', probability: 1, image: "https://i.pinimg.com/736x/8d/e6/5e/8de65e15968fb31fedd8c4f6c08ff39b.jpg" },
  { id: 'esencia_fenix', name: 'Esencia de Fénix', rarity: 'legendary', description: 'Esencia de renacimiento eterno', probability: 0.5, image: "https://i.pinimg.com/736x/d6/51/6e/d6516e12c58cf301a3eb67217e37cf47.jpg" },
  { id: 'corazon_dragon', name: 'Corazón de Dragón', rarity: 'legendary', description: 'Fuente de poder ancestral', probability: 0.5, image: "https://i.pinimg.com/736x/6b/ca/fa/6bcafa283ab4e5b1e1c2fb2057f25024.jpg" },
];

// Cartas temáticas para New Sunrise
export const Deck = [
  { id: 1, name: "Guardabosque Al'var", type: "Guerrero", faction: "Al'var", attack: 8, defense: 12, hp: 15, ability: "+2 DEF en bosques", price: 3, image:  "https://i.pinimg.com/736x/43/f4/a7/43f4a735c4eb762d37a498d4b62d1c4e.jpg", tier: 1 },
  { id: 2, name: "Druida de las Runas", type: "Mago", faction: "Al'var", attack: 12, defense: 6, hp: 10, ability: "Cura 3 HP aliado", price: 3, image: "https://i.pinimg.com/736x/26/f3/6b/26f36b4473e01c56228ebd4076534398.jpg", tier: 1 },
  { id: 3, name: "Espíritu del Bosque", type: "Criatura", faction: "Al'var", attack: 10, defense: 8, hp: 12, ability: "Esquivar primer ataque", price: 3, image: "https://i.pinimg.com/736x/29/ef/25/29ef25018072aed071cdc8091058e30b.jpg", tier: 1 },
  { id: 6, name: "Soldado de Mat'ais", type: "Guerrero", faction: "Mat'ais", attack: 12, defense: 7, hp: 12, ability: "+2 ATK primera ronda", price: 4, image: "https://i.pinimg.com/736x/8c/16/c9/8c16c9ab9f8d6454ca4a157a7e822038.jpg", tier: 2 },
  { id: 7, name: "Ingeniero de Guerra", type: "Técnico", faction: "Mat'ais", attack: 9, defense: 11, hp: 11, ability: "Reparar 5 HP aliado", price: 3, image: "https://i.pinimg.com/736x/80/fd/68/80fd681ccfaeaa4a4c19e25382084422.jpg", tier: 2 },
  { id: 8, name: "Golem de Escoria", type: "Máquina", faction: "Mat'ais", attack: 15, defense: 13, hp: 16, ability: "Ignora 3 DEF", price: 10, image: "https://i.pinimg.com/736x/4e/56/e8/4e56e8d361e431d168e6c4830ac0931f.jpg", tier: 2 },
  { id: 9, name: "Artillero de Vapor", type: "Técnico", faction: "Mat'ais", attack: 13, defense: 5, hp: 10, ability: "Daño área 2", price: 6, image: "https://i.pinimg.com/736x/13/dc/50/13dc501555989ffe8dabfc514271946e.jpg", tier: 3 },
  { id: 10, name: "Asalto Sombrío", type: "Guerrero", faction: "Mat'ais", attack: 11, defense: 8, hp: 11, ability: "Ataque rápido", price: 8, image: "https://i.pinimg.com/736x/2d/7a/e1/2d7ae13d5de050192db0d2f0326d2120.jpg", tier: 3 },
  { id: 11, name: "Protector de Núcleos", type: "Máquina", faction: "Mat'ais", attack: 3, defense: 10, hp: 14, ability: "Protege a sus aliados", price: 3, image: "https://i.pinimg.com/736x/62/03/98/6203988497d7023f5ec45c05e254c1fc.jpg", tier: 3 },
  { id: 12, name: "Mago de Vapor", type: "Mago", faction: "Mat'ais", attack: 8, defense: 8, hp: 12, ability: "Daño área 1", price: 3, image: "https://i.pinimg.com/736x/01/d9/04/01d9048aca131e28b7b842f5739ae6f0.jpg", tier: 4 },
  { id: 13, name: "Destructor de Almas", type: "Guerrero", faction: "Mat'ais", attack: 16, defense: 6, hp: 10, ability: "Roba vida igual a daño", price: 10, image: "https://i.pinimg.com/736x/c4/50/5d/c4505d33125c76ccf5ee167bb18ac2bb.jpg", tier: 4 },
  { id: 14, name: "Guardián de Almas", type: "Mago", faction: "Mat'ais", attack: 6, defense: 8, hp: 14, ability: "Restaura vida a aliados", price: 3, image: "https://i.pinimg.com/736x/30/38/6e/30386eedd694f40b2449fe2228a90f4b.jpg", tier: 4 },
];

// Enemigos clasificados por tier
export const Enemies = [
  { id: 1, name: "Bandido Novato", tier: 1, description: "Un ladrón inexperto que busca fortuna fácil", image: "https://i.pinimg.com/736x/8c/16/c9/8c16c9ab9f8d6454ca4a157a7e822038.jpg", reward: 20 },
  { id: 2, name: "Mercenario Experimentado", tier: 2, description: "Un guerrero veterano con habilidades probadas", image: "https://i.pinimg.com/736x/75/61/21/756121b1b83bfbd864aa45081bed3399.jpg", reward: 35 },
  { id: 3, name: "Señor de la Guerra", tier: 3, description: "Un comandante legendario con ejército propio", image: "https://i.pinimg.com/736x/c4/50/5d/c4505d33125c76ccf5ee167bb18ac2bb.jpg", reward: 50 },
  { id: 4, name: "Emperador Oscuro", tier: 4, description: "El gobernante supremo con poder absoluto", image: "https://i.pinimg.com/736x/4e/56/e8/4e56e8d361e431d168e6c4830ac0931f.jpg", reward: 75 },
];

// Clasificación de cartas por tier basado en propiedad tier
const tier1Cards = Deck.filter(card => card.tier === 1);
const tier2Cards = Deck.filter(card => card.tier === 2);
const tier3Cards = Deck.filter(card => card.tier === 3);
const tier4Cards = Deck.filter(card => card.tier === 4);

function getCurrentTierCards(currentEnemyIndex) {
  const tier = Enemies[currentEnemyIndex]?.tier || 1;
  if (tier === 1) return tier1Cards;
  if (tier === 2) return tier2Cards;
  if (tier === 3) return tier3Cards;
  return tier4Cards;
}

function getInitialHand(deck) {
  const shuffled = [...deck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map(card => ({ ...card }));
}

export function useGameStore() {
  const [playerDeck, setPlayerDeck] = useState([
    { id: 1, name: "Soldado del Norte", type: "Guerrero", faction: null, attack: 10, defense: 7, hp: 12, ability: null, price: 5, image: "https://i.pinimg.com/736x/75/61/21/756121b1b83bfbd864aa45081bed3399.jpg" },
    { id: 2, name: "Mercenario del Norte", type: "Mercenario", faction: null, attack: 12, defense: 8, hp: 10, ability: null, price: 5, image: "https://i.pinimg.com/736x/a7/1b/7c/a71b7c47a3b2426d8b75a29b7f2ac8d4.jpg" },
    { id: 3, name: "Lobrego salvaje", type: "Lobo", faction: null, attack: 13, defense: 4, hp: 12, ability: null, price: 5, image: "https://i.pinimg.com/736x/89/e9/14/89e914bf17586c61788dce214ddbe906.jpg" },
  ]);
  const [playerField, setPlayerField] = useState(() => getInitialHand(playerDeck.slice(0, 3)));
  const [enemyField, setEnemyField] = useState(() => getInitialHand(getCurrentTierCards(0)));
  const [turn, setTurn] = useState('player');
  const [selectedAttacker, setSelectedAttacker] = useState(null);
  const [log, setLog] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [menu, setMenu] = useState('home');
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [defeatedEnemies, setDefeatedEnemies] = useState([]);
  const [playerStone, setPlayerStone] = useState({
    name: "Semilla Ancestral",
    growth: 0,
    maxGrowth: 10,
    ability: "Potencia un soldado"
  });
  const [enemyStone, setEnemyStone] = useState({
    name: "Núcleo de Voluntad",
    charge: 0,
    maxCharge: 8,
    ability: "Rayo Devastador"
  });
  const [navbarMaximized, setNavbarMaximized] = useState(true);
  const [currentGold, setCurrentGold] = useState(10);
  const [inventory, setInventory] = useState({
    'Diorita': 0,
    'Mármol': 0,
    'Madera': 0,
    'Cristal': 0,
    'Acero': 0,
    'Cuero': 0,
    'Obsidiana': 0,
    'Mithril': 0,
    'Diamante': 0,
    'Adamantita': 0,
    'Esencia de Fénix': 0,
    'Corazón de Dragón': 0
  });

  const buyCard = (card) => {
    if (currentGold >= card.price) {
      setCurrentGold(prev => prev - card.price);
      setPlayerDeck(prev => {
        if (prev.some(c => c.id === card.id)) return prev;
        return [...prev, card];
      });
    } else {
      console.log("No tenés suficiente oro");
    }
  };

  // DEBUG: Mostrar estado actual en consola
  useEffect(() => {
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

  useEffect(() => {
    if (enemyField.length === 0 && !gameOver) {
      setDefeatedEnemies(prev => [...prev, currentEnemyIndex]);
      setCurrentGold(prev => prev + Enemies[currentEnemyIndex].reward);
      if (currentEnemyIndex + 1 >= Enemies.length) {
        setGameOver(true);
        setGameOverMessage("¡Has derrotado a todos los enemigos! ¡Victoria total!");
      } else {
        const newIndex = currentEnemyIndex + 1;
        setCurrentEnemyIndex(newIndex);
        // Reset battle for next enemy
        setPlayerField(() => getInitialHand(playerDeck.slice(0, 3)));
        setEnemyField(() => getInitialHand(getCurrentTierCards(newIndex)));
        setTurn('player');
        setSelectedAttacker(null);
        setLog([]);
        setPlayerStone(prev => ({ ...prev, growth: 0 }));
        setEnemyStone(prev => ({ ...prev, charge: 0 }));
      }
    }
  }, [enemyField, gameOver, currentEnemyIndex, playerDeck]);

  function updateRunicStone(attacker) {
    if (attacker === "player") {
      setPlayerStone(prev => {
        const newGrowth = Math.min(prev.growth + 2, prev.maxGrowth);
        if (newGrowth === prev.maxGrowth && prev.growth !== prev.maxGrowth) {
          addLog("¡La Semilla Ancestral florece! Espíritu Guardián invocado!");
        }
        return { ...prev, growth: newGrowth };
      });
    }
    if (attacker === "enemy") {
      setEnemyStone(prev => {
        const newCharge = Math.min(prev.charge + 3, prev.maxCharge);
        if (newCharge === prev.maxCharge && prev.charge !== prev.maxCharge) {
          addLog("¡El Núcleo de Voluntad se sobrecarga! ¡Peligro inminente!");
        }
        return { ...prev, charge: newCharge };
      });
    }
  }

  function attack(attacker, target, isPlayer) {
    console.log("Ataque ejecutado:", { attacker: attacker.name, target: target.name, isPlayer });

    let damage = Math.max(
      1,
      (attacker.attack || 0) - (target.defense || 0)
    );

    const newTarget = { ...target, hp: target.hp - damage };
    addLog(`${attacker.name} (${attacker.faction}) ataca a ${target.name} por ${damage} daño!`);

    updateRunicStone(isPlayer ? "player" : "enemy");

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

    setTimeout(() => {
      if (newPlayerField.length === 0) {
        setGameOver(true);
        setGameOverMessage("¡El Reino de Mat'ais prevalece! La tecnología domina sobre la naturaleza.");
        setCurrentGold(currentGold + 10);
      } else if (newEnemyField.length === 0) {
        setGameOver(true);
        setGameOverMessage("¡El Reino de Al'var triunfa! La sabiduría ancestral renace.");
        setCurrentGold(prev => prev + 10);

        // Generar drops por victoria
        const drops = generateBattleDrops();
        if (drops.length > 0) {
          addLog(`¡Has obtenido: ${drops.map(d => d.name).join(', ')}!`);
        }
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
    setPlayerField(getInitialHand(playerDeck.slice(0, 3)));
    setEnemyField(getInitialHand(getCurrentTierCards(currentEnemyIndex)));
    setTurn('player');
    setSelectedAttacker(null);
    setLog([]);
    setGameOver(false);
    setMenu('battle');
    setGameOverMessage("");
    setCurrentEnemyIndex(0);
    setDefeatedEnemies([]);
    setPlayerStone({ name: "Semilla Ancestral", growth: 0, maxGrowth: 10, ability: "Potencia un soldado" });
    setEnemyStone({ name: "Núcleo de Voluntad", charge: 0, maxCharge: 8, ability: "Rayo Devastador" });
  }

  function startBattleWithEnemy(enemyIndex) {
    setCurrentEnemyIndex(enemyIndex);
    setPlayerField(getInitialHand(playerDeck.slice(0, 3)));
    setEnemyField(getInitialHand(getCurrentTierCards(enemyIndex)));
    setTurn('player');
    setSelectedAttacker(null);
    setLog([]);
    setGameOver(false);
    setMenu('battle');
    setGameOverMessage("");
    setPlayerStone({ name: "Semilla Ancestral", growth: 0, maxGrowth: 10, ability: "Potencia un soldado" });
    setEnemyStone({ name: "Núcleo de Voluntad", charge: 0, maxCharge: 8, ability: "Rayo Devastador" });
  }

  function getFactionColor(player) {
    if (player === "Al'var") return '#2E8B57';
    if (player === "Mat'ais") return '#B22222';
    return '#333';
  }

  // Función para obtener un drop aleatorio basado en probabilidades
  function getRandomDrop() {
    const random = Math.random() * 100; // Número entre 0 y 100
    let cumulativeProbability = 0;

    for (const item of ITEMS) {
      cumulativeProbability += item.probability;
      if (random <= cumulativeProbability) {
        return item;
      }
    }

    // Fallback por si algo sale mal
    return ITEMS[0];
  }

  // Función para agregar un objeto al inventario
  function addToInventory(itemName, quantity = 1) {
    setInventory(prev => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + quantity
    }));
  }

  // Función para obtener drops al ganar una batalla
  function generateBattleDrops() {
    const drops = [];
    const numDrops = Math.floor(Math.random() * 3) + 1; // 1-3 drops por batalla

    for (let i = 0; i < numDrops; i++) {
      const drop = getRandomDrop();
      drops.push(drop);
      addToInventory(drop.name);
    }

    return drops;
  }

  function handleMenuChange(newMenu) {
    setMenu(newMenu);
    if (gameOver && newMenu !== 'battle') {
      setGameOver(false);
    }
  }

  return {
    // State
    playerDeck,
    playerField,
    enemyField,
    turn,
    selectedAttacker,
    log,
    gameOver,
    menu,
    gameOverMessage,
    currentEnemyIndex,
    defeatedEnemies,
    playerStone,
    enemyStone,
    navbarMaximized,
    currentGold,
    inventory,
    // Functions
    setPlayerDeck,
    setPlayerField,
    setEnemyField,
    setTurn,
    setSelectedAttacker,
    setLog,
    setGameOver,
    setMenu,
    setGameOverMessage,
    setPlayerStone,
    setEnemyStone,
    setNavbarMaximized,
    setCurrentGold,
    setInventory,
    buyCard,
    addLog,
    updateRunicStone,
    attack,
    playerAttackTarget,
    enemyPlay,
    resetGame,
    startBattleWithEnemy,
    getFactionColor,
    handleMenuChange,
    getRandomDrop,
    addToInventory,
    generateBattleDrops,
  };
}
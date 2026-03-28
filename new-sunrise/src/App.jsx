import React from "react";
import Lore from "./Lore";
import Navbar from "./components/Navbar";
import Battle from "./components/Battle";
import MainMenu from "./components/MainMenu";
import Cards from "./components/Cards";
import Shop from "./components/Shop";
import Inventory from "./components/Inventory";
import { useGameStore } from "./hooks/useGameStore";
import "./App.css";

export default function App() {
  const gameStore = useGameStore();

  const {
    gameOver,
    menu,
    gameOverMessage,
    navbarMaximized,
    setNavbarMaximized,
    handleMenuChange,
    resetGame,
    inventory,
  } = gameStore;

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <Navbar
        onMenuChange={handleMenuChange}
        isMaximized={navbarMaximized}
        onToggleMaximize={() => setNavbarMaximized(!navbarMaximized)}
        currentMenu={menu}
      />

      {/* Contenido principal con margen dinámico */}
      <div style={{
        marginTop: navbarMaximized ? '60px' : '180px',
        transition: 'margin-top 0.3s ease'
      }}>
        <header style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: "URL('https://fontmeme.com/fuentes/fuente-mortuary/')" }}>
          <h1>New Sunrise</h1>
          <h2>La Guerra de Tabak</h2>
          <p style={{ color: '#666' }}>Al'var vs Mat'ais - La batalla por el futuro</p>
        </header>

        {gameOver ? (
          <div style={{ textAlign: 'center' }}>
            <h2>{gameOverMessage}</h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button onClick={() => handleMenuChange('cards')}>Ver Ejército</button>
              <button onClick={() => handleMenuChange('lore')}>Conocer la Historia</button>
              <button onClick={() => resetGame()}>Nueva Batalla</button>
              <button onClick={() => handleMenuChange('shop')}>Tienda</button>
            </div>
          </div>
        ) : menu === 'battle' ? (
          <Battle gameStore={gameStore} />
        ) : menu === 'cards' ? (
          <Cards onBack={() => handleMenuChange('menu')} />
        ) : menu === 'inventory' ? (
          <Inventory onBack={() => handleMenuChange('menu')} inventory={inventory} />
        ) : menu === 'shop' ? (
          <Shop gameStore={gameStore} onBack={() => handleMenuChange('battle')} />
        ) : menu === 'lore' ? (
          <Lore onBack={() => handleMenuChange('battle')} />
        ) : (
          <MainMenu onMenuChange={handleMenuChange} />
        )}
      </div>
    </div>
  );
}


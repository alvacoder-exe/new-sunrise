import React from 'react';

export default function Lore({ onBack }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🌄 Historia de New Sunrise</h1>
      
      <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
        <h2>La Guerra del Crepúsculo</h2>
        <p>
          Durante milenios, el continente de Tabak fue dominado por dos superpotencias:
        </p>
        
        <h3 style={{ color: '#2E8B57' }}>El Reino de Al'var</h3>
        <p>
          Anidado entre picos montañosos y bosques ancestrales, Al'var era un reino de tradición, 
          espiritualidad y armonía con la naturaleza. Su poder residía en la conexión con las 
          energías telúricas del mundo.
        </p>
        
        <h3 style={{ color: '#B22222' }}>El Reino de Mat'ais</h3>
        <p>
          En las áridas llanuras del este, Mat'ais surgió como un testimonio del ingenio humano. 
          Una sociedad militarista que desarrolló tecnología para extraer poder del núcleo ígneo de Tabak.
        </p>
        
        <h2>La Catástrofe</h2>
        <p>
          La guerra fue catastrófica. Cuando el polvo se asentó, no quedaban vencedores. Solo cenizas.
          Ambos reinos quedaron reducidos a ruinas, y los guerreros restantes comenzaron la lucha 
          por los recursos y las Piedras Rúnicas que otorgan poder a sus portadores.
        </p>
        
        <h2>New Sunrise</h2>
        <p>
          Ahora, en este mundo herido, cada batalla decide qué ideología prevalecerá en el nuevo amanecer. 
          ¿La sabiduría ancestral de Al'var o el progreso tecnológico de Mat'ais?
        </p>
      </div>
      
      <button 
        onClick={onBack}
        style={{
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          background: '#2E8B57',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Volver al Juego
      </button>
    </div>
    
  );
}
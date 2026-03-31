import React from 'react';

function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', borderBottom: '1px solid #ccc' }}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          style={{
            background: activeTab === tab.key ? '#3498db' : '#f0f0f0',
            color: activeTab === tab.key ? 'white' : '#333',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            borderRadius: '5px 5px 0 0',
            marginRight: '0.5rem'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
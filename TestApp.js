import React from 'react';

export default function TestApp() {
  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'blue' }}>Hello from React!</h1>
      <p>If you see this, React is working!</p>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>JamvisRN Desktop Test</h2>
        <p>✅ React is rendering</p>
        <p>✅ Styles are working</p>
        <p>✅ JavaScript is executing</p>
      </div>
    </div>
  );
}


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegacyIndex from './pages/LegacyIndex';
import LegacyCifraView from './pages/LegacyCifraView';

// App simplificado para iPad 2 e dispositivos antigos
function LegacyApp() {
  // Garantir que o basename seja compatível
  const basename = (typeof window !== 'undefined' && window.location && window.location.pathname.includes('cifras-app')) 
    ? '/cifras-app/' 
    : '/';

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<LegacyIndex />} />
          <Route path="/cifra/:slug" element={<LegacyCifraView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default LegacyApp;

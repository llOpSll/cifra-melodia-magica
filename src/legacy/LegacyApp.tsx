
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegacyIndex from './pages/LegacyIndex';
import LegacyCifraView from './pages/LegacyCifraView';

// App simplificado para iPad 2
function LegacyApp() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL || "/cifras-app/"}>
      <Routes>
        <Route path="/" element={<LegacyIndex />} />
        <Route path="/cifra/:slug" element={<LegacyCifraView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default LegacyApp;

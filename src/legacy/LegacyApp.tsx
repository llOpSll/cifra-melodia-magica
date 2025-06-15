
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegacyIndex from './pages/LegacyIndex';
import LegacyCifraView from './pages/LegacyCifraView';

// App 100% compatível com iPad 2 e dispositivos antigos
function LegacyApp() {
  console.log('LegacyApp carregado para compatibilidade com dispositivos antigos');
  
  // Detectar o basename corretamente para diferentes ambientes
  var currentPath = '';
  try {
    currentPath = window.location.pathname;
  } catch(e) {
    currentPath = '/';
  }
  
  var basename = '/';
  if (currentPath.indexOf('/cifras-app') === 0) {
    basename = '/cifras-app/';
  }

  return React.createElement('div', {
    style: { 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #EAEFEF 0%, #B8CFCE 50%, #7F8CAA 100%)',
      fontFamily: 'Arial, Helvetica, sans-serif'
    }
  }, React.createElement(BrowserRouter, {
    basename: basename
  }, React.createElement(Routes, null,
    React.createElement(Route, { path: '/', element: React.createElement(LegacyIndex) }),
    React.createElement(Route, { path: '/cifra/:slug', element: React.createElement(LegacyCifraView) })
  )));
}

export default LegacyApp;

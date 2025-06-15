
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LegacyCifraCard } from '../components/LegacyCifraCard';
import { legacyGetCifras, legacyLoadCifras } from '../utils/legacyStorage';

interface Cifra {
  id: string;
  titulo: string;
  artista: string;
  tom: string;
  instrumento: string;
  cifra: string;
  slug: string;
  capotraste?: number;
}

export default function LegacyIndex() {
  var [busca, setBusca] = useState('');
  var [cifras, setCifras] = useState([]);
  var [carregando, setCarregando] = useState(true);

  useEffect(function() {
    function carregarCifras() {
      try {
        console.log('Carregando cifras para dispositivo legacy...');
        setCarregando(true);
        legacyLoadCifras();
        var cifrasCarregadas = legacyGetCifras();
        console.log('Cifras carregadas:', cifrasCarregadas.length);
        setCifras(cifrasCarregadas);
      } catch (error) {
        console.log('Erro ao carregar cifras:', error);
        setCifras([]);
      } finally {
        setCarregando(false);
      }
    }
    
    // Pequeno delay para garantir que tudo carregue
    setTimeout(carregarCifras, 100);
  }, []);

  var cifrasFiltradas = [];
  try {
    cifrasFiltradas = cifras.filter(function(c) {
      var titulo = (c.titulo || '').toLowerCase();
      var artista = (c.artista || '').toLowerCase();
      var buscaLower = busca.toLowerCase();
      return titulo.indexOf(buscaLower) !== -1 || artista.indexOf(buscaLower) !== -1;
    });
  } catch (error) {
    console.log('Erro ao filtrar cifras:', error);
    cifrasFiltradas = cifras;
  }

  if (carregando) {
    return React.createElement('div', {
      style: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#7F8CAA',
        background: 'linear-gradient(135deg, #EAEFEF 0%, #B8CFCE 50%, #7F8CAA 100%)',
        textAlign: 'center',
        padding: '20px'
      }
    }, 'Carregando cifras...');
  }

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      padding: '12px 8px',
      fontFamily: 'Arial, Helvetica, sans-serif',
      background: 'linear-gradient(135deg, #EAEFEF 0%, #B8CFCE 50%, #7F8CAA 100%)'
    }
  }, [
    // Header
    React.createElement('header', {
      key: 'header',
      style: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '20px'
      }
    }, React.createElement('h1', {
      style: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333447',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }
    }, '🎸 CifrasApp')),
    
    // Search
    React.createElement('div', {
      key: 'search',
      style: {
        maxWidth: '800px',
        margin: '0 auto 32px auto'
      }
    }, React.createElement('input', {
      type: 'text',
      placeholder: 'Buscar por artista ou música...',
      style: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '2px solid #B8CFCE',
        fontSize: '16px',
        backgroundColor: 'rgba(234, 239, 239, 0.9)',
        color: '#333447',
        boxSizing: 'border-box'
      },
      value: busca,
      onChange: function(e) { setBusca(e.target.value); }
    })),
    
    // Cards
    React.createElement('section', {
      key: 'cards',
      style: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
      }
    }, cifrasFiltradas.length > 0 ? 
      cifrasFiltradas.map(function(cifra) {
        return React.createElement(LegacyCifraCard, { key: cifra.id, cifra: cifra });
      }) : 
      React.createElement('div', {
        style: {
          gridColumn: '1 / -1',
          textAlign: 'center',
          fontSize: '18px',
          color: '#7F8CAA'
        }
      }, 'Nenhuma cifra encontrada.')
    ),
    
    // Footer
    React.createElement('footer', {
      key: 'footer',
      style: {
        marginTop: '32px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#7F8CAA'
      }
    }, '© ' + new Date().getFullYear() + ' CifrasApp · Feito com amor 🎸')
  ]);
}

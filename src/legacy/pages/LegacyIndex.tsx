
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
  const [busca, setBusca] = useState('');
  const [cifras, setCifras] = useState<Cifra[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(function() {
    function carregarCifras() {
      setCarregando(true);
      legacyLoadCifras();
      setCifras(legacyGetCifras());
      setCarregando(false);
    }
    carregarCifras();
  }, []);

  var cifrasFiltradas = cifras.filter(function(c) {
    return c.titulo.toLowerCase().indexOf(busca.toLowerCase()) !== -1 ||
           c.artista.toLowerCase().indexOf(busca.toLowerCase()) !== -1;
  });

  if (carregando) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#7F8CAA',
        background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)'
      }}>
        Carregando cifras...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '12px 8px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)'
    }}>
      <header style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#333447',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          🎸 CifrasApp
        </h1>
      </header>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto 32px auto'
      }}>
        <input
          type="text"
          placeholder="Buscar por artista ou música..."
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #B8CFCE',
            fontSize: '16px',
            backgroundColor: 'rgba(234, 239, 239, 0.9)',
            color: '#333447',
            boxSizing: 'border-box'
          }}
          value={busca}
          onChange={function(e) { setBusca(e.target.value); }}
        />
      </div>

      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {cifrasFiltradas.length > 0 ? (
          cifrasFiltradas.map(function(cifra) {
            return <LegacyCifraCard key={cifra.id} cifra={cifra} />;
          })
        ) : (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            fontSize: '18px',
            color: '#7F8CAA'
          }}>
            Nenhuma cifra encontrada.
          </div>
        )}
      </section>

      <footer style={{
        marginTop: '32px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#7F8CAA'
      }}>
        © {new Date().getFullYear()} CifrasApp · Feito com amor 🎸
      </footer>
    </div>
  );
}

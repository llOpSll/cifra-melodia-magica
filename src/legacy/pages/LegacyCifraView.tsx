
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { legacyGetCifraBySlug } from '../utils/legacyStorage';
import { LegacyTransposer } from '../components/LegacyTransposer';

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

export default function LegacyCifraView() {
  var params = useParams();
  var navigate = useNavigate();
  var [cifra, setCifra] = useState<Cifra | null>(null);
  var [fontSize, setFontSize] = useState(18);

  useEffect(function() {
    var slug = params.slug;
    if (slug) {
      var cifraEncontrada = legacyGetCifraBySlug(slug);
      setCifra(cifraEncontrada);
    }
  }, [params.slug]);

  if (!cifra) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#6B7280'
      }}>
        Cifra não encontrada.
      </div>
    );
  }

  var tomLimpo = cifra.tom.replace(/0+$/, '');

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)'
    }}>
      <div style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #B8CFCE',
        padding: '16px',
        position: 'sticky',
        top: '0',
        zIndex: 10,
        backgroundColor: 'rgba(234, 239, 239, 0.95)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={function() { navigate(-1); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: '600',
              fontSize: '14px',
              color: '#333447',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            ← Voltar
          </button>

          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333447',
              margin: '0 0 4px 0'
            }}>
              {cifra.titulo}
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#7F8CAA',
              margin: '0'
            }}>
              {cifra.artista}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={function() { setFontSize(function(fs) { return Math.min(fs + 2, 40); }); }}
              style={{
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '12px',
                backgroundColor: '#B8CFCE',
                color: '#333447',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              A+
            </button>
            <button
              onClick={function() { setFontSize(function(fs) { return Math.max(fs - 2, 10); }); }}
              style={{
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '12px',
                backgroundColor: '#EAEFEF',
                color: '#333447',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              A-
            </button>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '16px'
      }}>
        <div style={{
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #B8CFCE',
          backgroundColor: 'rgba(234, 239, 239, 0.9)'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#7F8CAA'
            }}>
              {cifra.instrumento} • Tom {tomLimpo}
              {cifra.capotraste && cifra.capotraste > 0 && (
                <span> • Capotraste {cifra.capotraste}ª casa</span>
              )}
            </div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '4px',
              color: '#333447',
              margin: '0 0 4px 0'
            }}>
              {cifra.titulo}
            </h2>
            <div style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#333447'
            }}>
              {cifra.artista}
            </div>
          </div>

          <LegacyTransposer
            cifra={cifra.cifra}
            tomOriginal={tomLimpo}
            fontSize={fontSize}
            capotrasteInicial={cifra.capotraste || 0}
          />
        </div>
      </div>
    </div>
  );
}

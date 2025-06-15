
import React from 'react';
import { Link } from 'react-router-dom';

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

interface Props {
  cifra: Cifra;
}

export function LegacyCifraCard({ cifra }: Props) {
  var isFromFile = cifra.id.indexOf('file-') === 0;
  var tomLimpo = cifra.tom.replace(/0+$/, '');
  
  return (
    <Link
      to={'/cifra/' + cifra.slug}
      style={{
        display: 'block',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        minHeight: '180px',
        border: '1px solid rgba(34, 197, 94, 0.2)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'box-shadow 0.2s ease'
      }}
      onMouseEnter={function(e) {
        e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={function(e) {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px',
        marginBottom: '4px',
        color: '#9CA3AF'
      }}>
        <span>{cifra.instrumento} • Tom {tomLimpo}</span>
        {isFromFile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#2563EB',
            backgroundColor: '#EFF6FF',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px'
          }}>
            📄 Arquivo
          </div>
        )}
      </div>
      
      <h2 style={{
        fontWeight: 'bold',
        fontSize: '20px',
        marginBottom: '8px',
        color: '#333447',
        margin: '0 0 8px 0'
      }}>
        {cifra.titulo}
      </h2>
      
      <div style={{
        fontWeight: '600',
        color: '#059669',
        fontSize: '16px',
        marginBottom: '4px'
      }}>
        {cifra.artista}
      </div>
      
      <pre style={{
        height: '48px',
        overflow: 'hidden',
        fontSize: '12px',
        fontFamily: 'monospace',
        color: '#6B7280',
        lineHeight: '1.3',
        margin: '0',
        whiteSpace: 'pre-wrap'
      }}>
        {cifra.cifra.split('\n')[0]}
      </pre>
    </Link>
  );
}

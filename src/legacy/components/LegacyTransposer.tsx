
import React, { useState } from 'react';

interface Props {
  cifra: string;
  tomOriginal: string;
  fontSize: number;
  capotrasteInicial: number;
}

var tons = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function transporAcorde(acorde: string, semitons: number): string {
  var regex = /^([A-G][#b]?)(.*)/;
  var match = acorde.match(regex);
  
  if (!match) return acorde;
  
  var notaBase = match[1];
  var sufixo = match[2];
  
  // Normalizar sustenidos e bemóis
  var notaNormalizada = notaBase.replace('b', '#');
  if (notaNormalizada === 'E#') notaNormalizada = 'F';
  if (notaNormalizada === 'B#') notaNormalizada = 'C';
  
  var indiceAtual = tons.indexOf(notaNormalizada);
  if (indiceAtual === -1) return acorde;
  
  var novoIndice = (indiceAtual + semitons + 12) % 12;
  return tons[novoIndice] + sufixo;
}

function transporCifra(cifra: string, semitons: number): string {
  if (semitons === 0) return cifra;
  
  var acordeRegex = /\b[A-G][#b]?(?:m|dim|aug|sus[24]?|add[0-9]|[0-9])*(?:\/[A-G][#b]?)?\b/g;
  
  return cifra.replace(acordeRegex, function(acorde) {
    return transporAcorde(acorde, semitons);
  });
}

export function LegacyTransposer({ cifra, tomOriginal, fontSize, capotrasteInicial }: Props) {
  var [transposicao, setTransposicao] = useState(0);
  var [capotraste, setCapotraste] = useState(capotrasteInicial);

  var cifraTransposta = transporCifra(cifra, transposicao);
  var tomAtual = transporAcorde(tomOriginal, transposicao);

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#333447' }}>
            Tom:
          </span>
          <button
            onClick={function() { setTransposicao(function(t) { return t - 1; }); }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#B8CFCE',
              color: '#333447',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            -
          </button>
          <span style={{
            minWidth: '40px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#333447'
          }}>
            {tomAtual}
          </span>
          <button
            onClick={function() { setTransposicao(function(t) { return t + 1; }); }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#B8CFCE',
              color: '#333447',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            +
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#333447' }}>
            Capotraste:
          </span>
          <button
            onClick={function() { setCapotraste(function(c) { return Math.max(c - 1, 0); }); }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#7F8CAA',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            -
          </button>
          <span style={{
            minWidth: '40px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#333447'
          }}>
            {capotraste}
          </span>
          <button
            onClick={function() { setCapotraste(function(c) { return c + 1; }); }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#7F8CAA',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            +
          </button>
        </div>
      </div>

      <pre style={{
        fontSize: fontSize + 'px',
        fontFamily: 'Courier, monospace',
        lineHeight: '1.4',
        color: '#333447',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        margin: '0',
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '8px',
        border: '1px solid rgba(184, 207, 206, 0.3)'
      }}>
        {cifraTransposta}
      </pre>
    </div>
  );
}

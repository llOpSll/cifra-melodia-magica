
import { Card, CardContent } from "./ui/card";

type ChordDiagramProps = {
  chord: string;
  instrument: 'violao' | 'guitarra' | 'cavaquinho' | 'ukulele';
};

// Base de dados expandida de acordes com pestanas e variações
const chordDatabase = {
  violao: {
    // Acordes maiores
    'C': { frets: [0, 1, 0, 2, 1, 0], fingers: [0, 1, 0, 3, 2, 0], barres: [] },
    'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], barres: [] },
    'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], barres: [] },
    'F': { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'G': { frets: [3, 2, 0, 0, 3, 3], fingers: [3, 1, 0, 0, 4, 4], barres: [] },
    'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], barres: [] },
    'B': { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 3, 4, 4, 2], barres: [{ fret: 2, fromString: 2, toString: 5 }] },
    
    // Acordes menores
    'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], barres: [] },
    'Dm': { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], barres: [] },
    'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], barres: [] },
    'Fm': { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'Gm': { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 3, fromString: 1, toString: 6 }] },
    'Cm': { frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], barres: [] },
    'Bm': { frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], barres: [] },
    
    // Acordes sustenidos/bemóis
    'C#': { frets: [-1, -1, 3, 1, 2, 1], fingers: [0, 0, 4, 1, 3, 2], barres: [] },
    'F#': { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 2, fromString: 1, toString: 6 }] },
    'G#': { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 4, fromString: 1, toString: 6 }] },
    'A#': { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 1, fromString: 2, toString: 6 }] },
    'Bb': { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 1, fromString: 2, toString: 6 }] },
    'D#': { frets: [-1, -1, 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3], barres: [] },
    'Eb': { frets: [-1, -1, 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3], barres: [] },
    'Ab': { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 4, fromString: 1, toString: 6 }] },
    'Gb': { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 2, fromString: 1, toString: 6 }] },
    'Db': { frets: [-1, -1, 3, 1, 2, 1], fingers: [0, 0, 4, 1, 3, 2], barres: [] },
    
    // Menores sustenidos/bemóis
    'C#m': { frets: [-1, -1, 2, 1, 2, 0], fingers: [0, 0, 3, 1, 4, 0], barres: [] },
    'F#m': { frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 2, fromString: 1, toString: 6 }] },
    'G#m': { frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 4, fromString: 1, toString: 6 }] },
    'A#m': { frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 4, 5, 3, 2], barres: [] },
    'Bbm': { frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 4, 5, 3, 2], barres: [] },
    'D#m': { frets: [-1, -1, 1, 3, 4, 2], fingers: [0, 0, 1, 3, 4, 2], barres: [] },
    'Ebm': { frets: [-1, -1, 1, 3, 4, 2], fingers: [0, 0, 1, 3, 4, 2], barres: [] },
    
    // Acordes com sétima
    'C7': { frets: [0, 1, 0, 2, 1, 3], fingers: [0, 1, 0, 2, 1, 4], barres: [] },
    'D7': { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 3, 1, 2], barres: [] },
    'E7': { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], barres: [] },
    'F7': { frets: [1, 3, 1, 2, 1, 1], fingers: [1, 4, 1, 3, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'G7': { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], barres: [] },
    'A7': { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0], barres: [] },
    'B7': { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], barres: [] },
    
    // Acordes menores com sétima
    'Am7': { frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0], barres: [] },
    'Dm7': { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 3, 1, 2], barres: [] },
    'Em7': { frets: [0, 2, 0, 0, 0, 0], fingers: [0, 2, 0, 0, 0, 0], barres: [] },
    'Fm7': { frets: [1, 3, 1, 1, 1, 1], fingers: [1, 4, 1, 1, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'Gm7': { frets: [3, 5, 3, 3, 3, 3], fingers: [1, 4, 1, 1, 1, 1], barres: [{ fret: 3, fromString: 1, toString: 6 }] },
    
    // Acordes com baixo invertido
    'F/A': { frets: [-1, 0, 3, 2, 1, 1], fingers: [0, 0, 4, 3, 1, 2], barres: [] },
    'C/E': { frets: [0, 3, 2, 0, 1, 0], fingers: [0, 4, 2, 0, 1, 0], barres: [] },
    'G/B': { frets: [-1, 2, 0, 0, 3, 3], fingers: [0, 1, 0, 0, 3, 4], barres: [] },
    'Am/C': { frets: [-1, 3, 2, 2, 1, 0], fingers: [0, 3, 2, 4, 1, 0], barres: [] },
    
    // Acordes suspensos
    'Csus2': { frets: [-1, 3, 0, 0, 1, 3], fingers: [0, 2, 0, 0, 1, 3], barres: [] },
    'Csus4': { frets: [-1, 3, 3, 0, 1, 1], fingers: [0, 3, 4, 0, 1, 2], barres: [] },
    'Dsus2': { frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 2, 0], barres: [] },
    'Dsus4': { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 2, 3], barres: [] },
    'Esus4': { frets: [0, 2, 2, 2, 0, 0], fingers: [0, 1, 2, 3, 0, 0], barres: [] },
    'Fsus2': { frets: [1, 3, 1, 0, 1, 1], fingers: [1, 4, 2, 0, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'Gsus4': { frets: [3, 3, 0, 0, 1, 3], fingers: [2, 3, 0, 0, 1, 4], barres: [] },
    'Asus2': { frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0], barres: [] },
    'Asus4': { frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 4, 0], barres: [] },
    
    // Acordes aumentados e diminutos
    'Caug': { frets: [-1, 3, 2, 1, 1, 0], fingers: [0, 4, 3, 1, 2, 0], barres: [] },
    'Cdim': { frets: [-1, -1, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4], barres: [] },
    'Daug': { frets: [-1, -1, 0, 3, 3, 2], fingers: [0, 0, 0, 2, 3, 1], barres: [] },
    'Ddim': { frets: [-1, -1, 0, 1, 0, 1], fingers: [0, 0, 0, 1, 0, 2], barres: [] },
    
    // Variações de posição
    'C (pos. 2)': { frets: [-1, 3, 5, 5, 5, 3], fingers: [0, 1, 3, 4, 5, 2], barres: [] },
    'D (pos. 2)': { frets: [5, 5, 7, 7, 7, 5], fingers: [1, 1, 3, 4, 5, 2], barres: [{ fret: 5, fromString: 1, toString: 6 }] },
    'E (pos. 2)': { frets: [7, 9, 9, 8, 7, 7], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 7, fromString: 1, toString: 6 }] },
    'A (pos. 2)': { frets: [5, 7, 7, 6, 5, 5], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 5, fromString: 1, toString: 6 }] }
  },
  guitarra: {
    // Usar a mesma estrutura do violão para guitarra
    'C': { frets: [0, 1, 0, 2, 1, 0], fingers: [0, 1, 0, 3, 2, 0], barres: [] },
    'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], barres: [] },
    'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], barres: [] },
    'F': { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'G': { frets: [3, 2, 0, 0, 3, 3], fingers: [3, 1, 0, 0, 4, 4], barres: [] },
    'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], barres: [] },
    'B': { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 3, 4, 4, 2], barres: [{ fret: 2, fromString: 2, toString: 5 }] },
    'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], barres: [] },
    'Dm': { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], barres: [] },
    'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], barres: [] },
    'Fm': { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'Gm': { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 3, fromString: 1, toString: 6 }] },
    'C7': { frets: [0, 1, 0, 2, 1, 3], fingers: [0, 1, 0, 2, 1, 4], barres: [] },
    'D7': { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 3, 1, 2], barres: [] },
    'E7': { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], barres: [] },
    'F7': { frets: [1, 3, 1, 2, 1, 1], fingers: [1, 4, 1, 3, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'G7': { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], barres: [] },
    'A7': { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0], barres: [] },
    'B7': { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], barres: [] }
  }
};

const stringNames = ['E', 'A', 'D', 'G', 'B', 'E'];

export function ChordDiagram({ chord, instrument }: ChordDiagramProps) {
  // Simplificar o nome do acorde para busca
  const baseChord = chord.replace(/[()]/g, '');
  const chordData = chordDatabase[instrument]?.[baseChord];

  if (!chordData) {
    return (
      <Card className="w-44">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="font-bold text-sm mb-2">{chord}</div>
            <div className="text-xs text-gray-500">Diagrama não disponível</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { frets, fingers, barres = [] } = chordData;

  // Encontrar a casa inicial para mostrar no diagrama
  const activeFrets = frets.filter(f => f > 0);
  const startFret = activeFrets.length > 0 ? Math.min(...activeFrets) : 1;
  const displayStartFret = startFret > 1 ? startFret : 1;

  return (
    <Card className="w-44">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="font-bold text-base mb-3" style={{ color: '#333447' }}>{chord}</div>
          
          {/* Diagram */}
          <div className="relative">
            {/* String names */}
            <div className="flex justify-between text-xs font-semibold mb-2" style={{ color: '#333447' }}>
              {stringNames.map((string, i) => (
                <span key={i} className="w-6 text-center">{string}</span>
              ))}
            </div>
            
            {/* Open/Muted indicators above the fretboard */}
            <div className="flex justify-between items-center mb-2">
              {frets.map((fret, stringIndex) => {
                const isOpen = fret === 0;
                const isMuted = fret === -1;
                
                return (
                  <div key={stringIndex} className="w-6 h-4 flex items-center justify-center">
                    {isOpen && (
                      <div className="w-3 h-3 border-2 border-green-600 rounded-full bg-white"></div>
                    )}
                    {isMuted && (
                      <div className="text-red-600 text-lg font-bold">×</div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Fret position indicator */}
            {displayStartFret > 1 && (
              <div className="absolute -left-8 top-8 text-sm font-bold" style={{ color: '#333447' }}>
                {displayStartFret}ª
              </div>
            )}
            
            {/* Fretboard */}
            <div className="border-2 border-gray-800 bg-amber-50 relative" style={{ height: '140px', width: '100%' }}>
              {/* Nut (primeira linha mais grossa se começar na 1ª casa) */}
              {displayStartFret === 1 && (
                <div className="absolute w-full border-b-4 border-gray-900" style={{ top: '0px' }} />
              )}
              
              {/* Fret lines */}
              {[...Array(5)].map((_, fretIndex) => (
                <div 
                  key={fretIndex} 
                  className="absolute w-full border-b-2 border-gray-600"
                  style={{ 
                    top: `${((fretIndex + 1) * 100) / 5}%`,
                  }}
                />
              ))}
              
              {/* String lines */}
              {[...Array(6)].map((_, stringIndex) => (
                <div 
                  key={stringIndex}
                  className="absolute h-full border-l border-gray-500"
                  style={{ 
                    left: `${((stringIndex * 100) / 5) + (100/10)}%`,
                    width: '1px'
                  }}
                />
              ))}
              
              {/* Barres (pestanas) */}
              {barres.map((barre, barreIndex) => {
                const fretPosition = barre.fret - displayStartFret + 1;
                if (fretPosition < 1 || fretPosition > 5) return null;
                
                const leftString = Math.min(barre.fromString, barre.toString);
                const rightString = Math.max(barre.fromString, barre.toString);
                const leftPercent = ((leftString - 1) * 100) / 5 + (100/10);
                const rightPercent = ((rightString - 1) * 100) / 5 + (100/10);
                
                return (
                  <div
                    key={barreIndex}
                    className="absolute rounded-full"
                    style={{
                      backgroundColor: '#1f2937',
                      height: '12px',
                      left: `${leftPercent}%`,
                      width: `${rightPercent - leftPercent}%`,
                      top: `${((fretPosition - 0.5) * 100) / 5 - 6}%`,
                      border: '2px solid #fff',
                      zIndex: 1
                    }}
                  />
                );
              })}
              
              {/* Finger positions */}
              {frets.map((fret, stringIndex) => {
                if (fret <= 0) return null;
                
                const fingerNumber = fingers[stringIndex];
                const fretPosition = fret - displayStartFret + 1;
                
                if (fretPosition < 1 || fretPosition > 5) return null;
                
                // Verificar se este dedo faz parte de uma pestana
                const isPartOfBarre = barres.some(barre => 
                  barre.fret === fret && 
                  stringIndex + 1 >= Math.min(barre.fromString, barre.toString) &&
                  stringIndex + 1 <= Math.max(barre.fromString, barre.toString)
                );
                
                return (
                  <div
                    key={stringIndex}
                    className="absolute rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                    style={{
                      backgroundColor: isPartOfBarre ? '#1f2937' : '#333447',
                      width: '20px',
                      height: '20px',
                      left: `${((stringIndex * 100) / 5) + (100/10) - 10}px`,
                      top: `${((fretPosition - 0.5) * 100) / 5 - 10}%`,
                      border: '2px solid #fff',
                      zIndex: 2
                    }}
                  >
                    {!isPartOfBarre && fingerNumber > 0 ? fingerNumber : ''}
                  </div>
                );
              })}
              
              {/* Fret numbers on the side */}
              <div className="absolute -right-6 h-full flex flex-col justify-around text-xs font-semibold" style={{ color: '#7F8CAA' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-center">{displayStartFret + i}</span>
                ))}
              </div>
            </div>
            
            {/* Legend for barres */}
            {barres.length > 0 && (
              <div className="mt-3 text-xs text-center" style={{ color: '#7F8CAA' }}>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-4 h-2 bg-gray-800 rounded-full border border-white"></div>
                  <span>Pestana (barré)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

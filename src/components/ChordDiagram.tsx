
import { Card, CardContent } from "./ui/card";

type ChordDiagramProps = {
  chord: string;
  instrument: 'violao' | 'guitarra' | 'cavaquinho' | 'ukulele';
};

// Base de dados simplificada de acordes - em um app real seria muito mais extensa
const chordDatabase = {
  violao: {
    'C': { frets: [0, 1, 0, 2, 1, 0], fingers: [0, 1, 0, 3, 2, 0] },
    'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
    'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
    'F': { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1] },
    'G': { frets: [3, 2, 0, 0, 3, 3], fingers: [3, 1, 0, 0, 4, 4] },
    'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
    'B': { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 3, 4, 5, 2] },
    'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
    'Dm': { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
    'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
    'C#': { frets: [-1, -1, 3, 1, 2, 1], fingers: [0, 0, 4, 1, 3, 2] },
    'F#': { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1] },
    'G#': { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1] },
    'A#': { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 3, 4, 5, 2] },
    'Bb': { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 3, 4, 5, 2] },
    'Bbm': { frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 4, 5, 3, 2] },
    'Fm': { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1] },
    'Gm': { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1] },
    'Cm': { frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1] },
    'Ab': { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1] },
    'Gb': { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1] },
    'Db': { frets: [-1, -1, 3, 1, 2, 1], fingers: [0, 0, 4, 1, 3, 2] },
    'Eb': { frets: [-1, -1, 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3] },
    'D#': { frets: [-1, -1, 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3] },
    'F/A': { frets: [-1, 0, 3, 2, 1, 1], fingers: [0, 0, 4, 3, 1, 2] },
    'F/D#': { frets: [-1, -1, 1, 2, 1, 1], fingers: [0, 0, 1, 3, 2, 1] },
    'A#/D': { frets: [-1, -1, 0, 3, 3, 1], fingers: [0, 0, 0, 3, 4, 1] },
    'Cm/A#': { frets: [-1, 1, 3, 0, 4, 3], fingers: [0, 1, 3, 0, 4, 2] },
    'D#4': { frets: [-1, -1, 1, 3, 4, 4], fingers: [0, 0, 1, 2, 3, 4] }
  },
  guitarra: {
    'C': { frets: [0, 1, 0, 2, 1, 0], fingers: [0, 1, 0, 3, 2, 0] },
    'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
    'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
    'F': { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1] },
    'G': { frets: [3, 2, 0, 0, 3, 3], fingers: [3, 1, 0, 0, 4, 4] },
    'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
    'B': { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 3, 4, 5, 2] },
    'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
    'Dm': { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
    'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
    'C#': { frets: [-1, -1, 3, 1, 2, 1], fingers: [0, 0, 4, 1, 3, 2] },
    'F#': { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1] },
    'G#': { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1] },
    'A#': { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 3, 4, 5, 2] },
    'Bb': { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 3, 4, 5, 2] },
    'Bbm': { frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 4, 5, 3, 2] },
    'Fm': { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1] },
    'Gm': { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1] },
    'Cm': { frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1] },
    'Ab': { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1] },
    'Gb': { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1] },
    'Db': { frets: [-1, -1, 3, 1, 2, 1], fingers: [0, 0, 4, 1, 3, 2] },
    'Eb': { frets: [-1, -1, 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3] },
    'D#': { frets: [-1, -1, 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3] },
    'F/A': { frets: [-1, 0, 3, 2, 1, 1], fingers: [0, 0, 4, 3, 1, 2] },
    'F/D#': { frets: [-1, -1, 1, 2, 1, 1], fingers: [0, 0, 1, 3, 2, 1] },
    'A#/D': { frets: [-1, -1, 0, 3, 3, 1], fingers: [0, 0, 0, 3, 4, 1] },
    'Cm/A#': { frets: [-1, 1, 3, 0, 4, 3], fingers: [0, 1, 3, 0, 4, 2] },
    'D#4': { frets: [-1, -1, 1, 3, 4, 4], fingers: [0, 0, 1, 2, 3, 4] }
  }
};

const stringNames = ['E', 'A', 'D', 'G', 'B', 'E'];

export function ChordDiagram({ chord, instrument }: ChordDiagramProps) {
  // Simplificar o nome do acorde para busca
  const baseChord = chord.replace(/[()]/g, '');
  const chordData = chordDatabase[instrument]?.[baseChord];

  if (!chordData) {
    return (
      <Card className="w-40">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="font-bold text-sm mb-2">{chord}</div>
            <div className="text-xs text-gray-500">Diagrama não disponível</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { frets, fingers } = chordData;

  // Encontrar a casa inicial para mostrar no diagrama
  const activeFrets = frets.filter(f => f > 0);
  const startFret = activeFrets.length > 0 ? Math.min(...activeFrets) : 1;
  const endFret = Math.max(startFret + 3, 5); // Mostrar pelo menos 4 casas

  return (
    <Card className="w-40">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="font-bold text-base mb-3">{chord}</div>
          
          {/* Diagram */}
          <div className="relative">
            {/* String names */}
            <div className="flex justify-between text-xs font-semibold mb-2" style={{ color: '#333447' }}>
              {stringNames.map((string, i) => (
                <span key={i} className="w-5 text-center">{string}</span>
              ))}
            </div>
            
            {/* Open/Muted indicators above the fretboard */}
            <div className="flex justify-between items-center mb-2">
              {frets.map((fret, stringIndex) => {
                const isOpen = fret === 0;
                const isMuted = fret === -1;
                
                return (
                  <div key={stringIndex} className="w-5 h-4 flex items-center justify-center">
                    {isOpen && (
                      <div className="w-3 h-3 border-2 border-green-600 rounded-full bg-white"></div>
                    )}
                    {isMuted && (
                      <div className="text-red-600 text-base font-bold">×</div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Fretboard */}
            <div className="border-2 border-gray-800 bg-amber-50 relative" style={{ height: '120px', width: '100%' }}>
              {/* Fret lines */}
              {[...Array(4)].map((_, fretIndex) => (
                <div 
                  key={fretIndex} 
                  className="absolute w-full border-b border-gray-600"
                  style={{ 
                    top: `${((fretIndex + 1) * 100) / 4}%`,
                    height: '1px'
                  }}
                />
              ))}
              
              {/* String lines */}
              {[...Array(6)].map((_, stringIndex) => (
                <div 
                  key={stringIndex}
                  className="absolute h-full border-l border-gray-400"
                  style={{ 
                    left: `${((stringIndex * 100) / 5) + (100/10)}%`,
                    width: '1px'
                  }}
                />
              ))}
              
              {/* Finger positions */}
              {frets.map((fret, stringIndex) => {
                if (fret <= 0) return null;
                
                const fingerNumber = fingers[stringIndex];
                const fretPosition = fret - startFret + 1;
                
                if (fretPosition < 1 || fretPosition > 4) return null;
                
                return (
                  <div
                    key={stringIndex}
                    className="absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                    style={{
                      backgroundColor: '#333447',
                      left: `${((stringIndex * 100) / 5) + (100/10) - 12}px`,
                      top: `${((fretPosition - 0.5) * 100) / 4 - 12}%`,
                      border: '2px solid #fff'
                    }}
                  >
                    {fingerNumber || ''}
                  </div>
                );
              })}
            </div>
            
            {/* Fret numbers */}
            <div className="flex justify-between mt-2 text-xs font-semibold" style={{ color: '#7F8CAA' }}>
              <span className="w-5 text-center">{startFret}</span>
              <span className="w-5 text-center">{startFret + 1}</span>
              <span className="w-5 text-center">{startFret + 2}</span>
              <span className="w-5 text-center">{startFret + 3}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

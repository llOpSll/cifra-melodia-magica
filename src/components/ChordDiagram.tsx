
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
    'A#/D': { frets: [-1, -1, 0, 3, 3, 1], fingers: [0, 0, 0, 3, 4, 1] },
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
    'A#/D': { frets: [-1, -1, 0, 3, 3, 1], fingers: [0, 0, 0, 3, 4, 1] },
    'F/A': { frets: [-1, 0, 3, 2, 1, 1], fingers: [0, 0, 4, 3, 1, 2] },
    'F/D#': { frets: [-1, -1, 1, 2, 1, 1], fingers: [0, 0, 1, 3, 2, 1] },
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
      <Card className="w-32">
        <CardContent className="p-3">
          <div className="text-center">
            <div className="font-bold text-sm mb-2">{chord}</div>
            <div className="text-xs text-gray-500">Diagrama não disponível</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { frets, fingers } = chordData;

  return (
    <Card className="w-32">
      <CardContent className="p-3">
        <div className="text-center">
          <div className="font-bold text-sm mb-2">{chord}</div>
          
          {/* Diagram */}
          <div className="relative">
            {/* Strings names */}
            <div className="flex justify-between text-xs mb-1" style={{ color: '#7F8CAA' }}>
              {stringNames.map((string, i) => (
                <span key={i} className="w-4 text-center">{string}</span>
              ))}
            </div>
            
            {/* Fretboard */}
            <div className="border border-gray-300 bg-white p-2">
              {/* Frets (5 frets shown) */}
              {[...Array(5)].map((_, fretIndex) => (
                <div key={fretIndex} className="flex justify-between items-center h-6 border-b border-gray-200 last:border-b-0">
                  {frets.map((fret, stringIndex) => {
                    const isPressed = fret === fretIndex + 1;
                    const fingerNumber = isPressed ? fingers[stringIndex] : null;
                    const isOpen = fret === 0 && fretIndex === 0;
                    const isMuted = fret === -1 && fretIndex === 0;
                    
                    return (
                      <div key={stringIndex} className="w-4 h-4 flex items-center justify-center relative">
                        {/* String line */}
                        <div className="absolute w-full h-0.5 bg-gray-400"></div>
                        
                        {/* Finger position */}
                        {isPressed && (
                          <div 
                            className="w-3 h-3 rounded-full flex items-center justify-center text-xs font-bold text-white z-10"
                            style={{ backgroundColor: '#333447' }}
                          >
                            {fingerNumber || ''}
                          </div>
                        )}
                        
                        {/* Open string indicator */}
                        {isOpen && (
                          <div className="w-2 h-2 border-2 border-green-600 rounded-full bg-white z-10"></div>
                        )}
                        
                        {/* Muted string indicator */}
                        {isMuted && (
                          <div className="text-red-600 text-lg font-bold z-10">×</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            {/* Fret numbers */}
            <div className="flex justify-start mt-1">
              <div className="text-xs" style={{ color: '#7F8CAA' }}>
                1 2 3 4 5
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

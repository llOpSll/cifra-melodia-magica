
import { Card, CardContent } from "./ui/card";
import { ChordData } from "../utils/chordDatabase";

type ChordDiagramCanvasProps = {
  chord: string;
  chordData: ChordData;
  stringNames: string[];
};

export function ChordDiagramCanvas({ chord, chordData, stringNames }: ChordDiagramCanvasProps) {
  const { frets, fingers, barres = [] } = chordData;

  // Find the starting fret for display
  const activeFrets = frets.filter(f => f > 0);
  const startFret = activeFrets.length > 0 ? Math.min(...activeFrets) : 1;
  const displayStartFret = startFret > 1 ? startFret : 1;

  return (
    <Card className="w-32 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
      <CardContent className="p-3">
        <div className="text-center">
          <div className="font-semibold text-sm mb-2" style={{ color: '#374151' }}>
            {chord}
          </div>
          
          {/* Diagram Container */}
          <div className="relative mx-auto" style={{ width: '90px' }}>
            {/* String names at top */}
            <div className="flex justify-between text-xs mb-2" style={{ color: '#6B7280' }}>
              {stringNames.map((string, i) => (
                <span key={i} className="w-3 text-center">{string}</span>
              ))}
            </div>
            
            {/* Open/Muted indicators */}
            <div className="flex justify-between items-center mb-2">
              {frets.map((fret, stringIndex) => {
                const isOpen = fret === 0;
                const isMuted = fret === -1;
                
                return (
                  <div key={stringIndex} className="w-3 h-3 flex items-center justify-center">
                    {isOpen && (
                      <div className="w-2.5 h-2.5 border-2 border-green-500 rounded-full bg-white"></div>
                    )}
                    {isMuted && (
                      <div className="text-red-500 text-sm font-bold">×</div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Fret position indicator */}
            {displayStartFret > 1 && (
              <div className="absolute -left-6 top-8 text-xs font-medium bg-white px-1 rounded border" style={{ color: '#6B7280' }}>
                {displayStartFret}
              </div>
            )}
            
            {/* Compact Fretboard */}
            <div 
              className="border-2 relative rounded-sm" 
              style={{ 
                height: '100px', 
                width: '100%',
                background: 'linear-gradient(to bottom, #FEF3E2 0%, #FDE68A 100%)',
                borderColor: '#D97706'
              }}
            >
              {/* Nut (thicker line for first fret) */}
              {displayStartFret === 1 && (
                <div className="absolute w-full bg-gray-800" style={{ height: '3px', top: '0px' }} />
              )}
              
              {/* Fret lines */}
              {[...Array(5)].map((_, fretIndex) => (
                <div 
                  key={fretIndex} 
                  className="absolute w-full bg-gray-600"
                  style={{ 
                    height: '1.5px',
                    top: `${((fretIndex + 1) * 100) / 5}%`
                  }}
                />
              ))}
              
              {/* String lines */}
              {[...Array(stringNames.length)].map((_, stringIndex) => (
                <div 
                  key={stringIndex}
                  className="absolute h-full bg-gray-400"
                  style={{ 
                    width: '1.5px',
                    left: `${((stringIndex * 100) / (stringNames.length - 1))}%`
                  }}
                />
              ))}
              
              {/* Barres */}
              {barres.map((barre, barreIndex) => {
                const fretPosition = barre.fret - displayStartFret + 1;
                if (fretPosition < 1 || fretPosition > 5) return null;
                
                const leftString = Math.min(barre.fromString, barre.toString) - 1;
                const rightString = Math.max(barre.fromString, barre.toString) - 1;
                const leftPercent = (leftString * 100) / (stringNames.length - 1);
                const rightPercent = (rightString * 100) / (stringNames.length - 1);
                
                return (
                  <div
                    key={barreIndex}
                    className="absolute rounded-full border border-white"
                    style={{
                      background: 'linear-gradient(135deg, #374151 0%, #4B5563 100%)',
                      height: '12px',
                      left: `${leftPercent}%`,
                      width: `${rightPercent - leftPercent}%`,
                      top: `${((fretPosition - 0.5) * 100) / 5 - 6}%`,
                      zIndex: 10
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
                
                const isPartOfBarre = barres.some(barre => 
                  barre.fret === fret && 
                  stringIndex + 1 >= Math.min(barre.fromString, barre.toString) &&
                  stringIndex + 1 <= Math.max(barre.fromString, barre.toString)
                );
                
                return (
                  <div
                    key={stringIndex}
                    className="absolute rounded-full flex items-center justify-center text-xs font-bold text-white border border-white"
                    style={{
                      background: isPartOfBarre 
                        ? 'linear-gradient(135deg, #374151 0%, #4B5563 100%)' 
                        : 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                      width: '18px',
                      height: '18px',
                      left: `${((stringIndex * 100) / (stringNames.length - 1)) - 9}px`,
                      top: `${((fretPosition - 0.5) * 100) / 5 - 9}%`,
                      zIndex: 20
                    }}
                  >
                    {!isPartOfBarre && fingerNumber > 0 ? fingerNumber : ''}
                  </div>
                );
              })}
            </div>
            
            {/* Simplified legend */}
            <div className="mt-2 text-xs flex items-center justify-center gap-3" style={{ color: '#9CA3AF' }}>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 border border-green-500 rounded-full bg-white"></div>
                Solta
              </span>
              <span className="flex items-center gap-1">
                <span className="text-red-500 font-bold text-xs">×</span>
                Muda
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

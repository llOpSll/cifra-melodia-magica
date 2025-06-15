
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
    <Card className="w-28 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
      <CardContent className="p-2">
        <div className="text-center">
          <div className="font-semibold text-xs mb-2" style={{ color: '#374151' }}>
            {chord}
          </div>
          
          {/* Diagram Container */}
          <div className="relative mx-auto" style={{ width: '80px' }}>
            {/* String names at top */}
            <div className="flex justify-between text-xs mb-1" style={{ color: '#6B7280' }}>
              {stringNames.map((string, i) => (
                <span key={i} className="text-center" style={{ width: '10px' }}>{string}</span>
              ))}
            </div>
            
            {/* Open/Muted indicators */}
            <div className="flex justify-between items-center mb-1" style={{ paddingLeft: '1px', paddingRight: '1px' }}>
              {frets.map((fret, stringIndex) => {
                const isOpen = fret === 0;
                const isMuted = fret === -1;
                
                return (
                  <div key={stringIndex} className="flex items-center justify-center" style={{ width: '10px', height: '12px' }}>
                    {isOpen && (
                      <div className="border-2 border-green-500 rounded-full bg-white" style={{ width: '8px', height: '8px' }}></div>
                    )}
                    {isMuted && (
                      <div className="text-red-500 font-bold" style={{ fontSize: '10px' }}>×</div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Fret position indicator */}
            {displayStartFret > 1 && (
              <div className="absolute text-xs font-medium bg-white px-1 rounded border" style={{ 
                color: '#6B7280', 
                left: '-18px', 
                top: '24px' 
              }}>
                {displayStartFret}
              </div>
            )}
            
            {/* Fretboard with precise positioning */}
            <div 
              className="border-2 relative rounded-sm" 
              style={{ 
                height: '80px', 
                width: '80px',
                background: 'linear-gradient(to bottom, #FEF3E2 0%, #FDE68A 100%)',
                borderColor: '#D97706'
              }}
            >
              {/* Nut (thicker line for first fret) */}
              {displayStartFret === 1 && (
                <div className="absolute w-full bg-gray-800" style={{ height: '2px', top: '0px' }} />
              )}
              
              {/* Fret lines - positioned precisely */}
              {[1, 2, 3, 4].map((fretIndex) => (
                <div 
                  key={fretIndex} 
                  className="absolute w-full bg-gray-600"
                  style={{ 
                    height: '1px',
                    top: `${(fretIndex * 20)}px`
                  }}
                />
              ))}
              
              {/* String lines - positioned precisely */}
              {stringNames.map((_, stringIndex) => (
                <div 
                  key={stringIndex}
                  className="absolute h-full bg-gray-400"
                  style={{ 
                    width: '1px',
                    left: `${stringIndex * (78 / (stringNames.length - 1))}px`
                  }}
                />
              ))}
              
              {/* Barres */}
              {barres.map((barre, barreIndex) => {
                const fretPosition = barre.fret - displayStartFret + 1;
                if (fretPosition < 1 || fretPosition > 4) return null;
                
                const leftString = Math.min(barre.fromString, barre.toString) - 1;
                const rightString = Math.max(barre.fromString, barre.toString) - 1;
                const leftPos = leftString * (78 / (stringNames.length - 1));
                const rightPos = rightString * (78 / (stringNames.length - 1));
                
                return (
                  <div
                    key={barreIndex}
                    className="absolute rounded-full border border-white"
                    style={{
                      background: 'linear-gradient(135deg, #374151 0%, #4B5563 100%)',
                      height: '8px',
                      left: `${leftPos}px`,
                      width: `${rightPos - leftPos + 2}px`,
                      top: `${(fretPosition - 0.5) * 20 - 4}px`,
                      zIndex: 10
                    }}
                  />
                );
              })}
              
              {/* Finger positions - positioned precisely */}
              {frets.map((fret, stringIndex) => {
                if (fret <= 0) return null;
                
                const fingerNumber = fingers[stringIndex];
                const fretPosition = fret - displayStartFret + 1;
                
                if (fretPosition < 1 || fretPosition > 4) return null;
                
                const isPartOfBarre = barres.some(barre => 
                  barre.fret === fret && 
                  stringIndex + 1 >= Math.min(barre.fromString, barre.toString) &&
                  stringIndex + 1 <= Math.max(barre.fromString, barre.toString)
                );
                
                const stringPos = stringIndex * (78 / (stringNames.length - 1));
                
                return (
                  <div
                    key={stringIndex}
                    className="absolute rounded-full flex items-center justify-center text-xs font-bold text-white border border-white"
                    style={{
                      background: isPartOfBarre 
                        ? 'linear-gradient(135deg, #374151 0%, #4B5563 100%)' 
                        : 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                      width: '12px',
                      height: '12px',
                      left: `${stringPos - 6}px`,
                      top: `${(fretPosition - 0.5) * 20 - 6}px`,
                      zIndex: 20,
                      fontSize: '8px'
                    }}
                  >
                    {!isPartOfBarre && fingerNumber > 0 ? fingerNumber : ''}
                  </div>
                );
              })}
            </div>
            
            {/* Simplified legend */}
            <div className="mt-1 text-xs flex items-center justify-center gap-2" style={{ color: '#9CA3AF', fontSize: '9px' }}>
              <span className="flex items-center gap-1">
                <div className="border border-green-500 rounded-full bg-white" style={{ width: '6px', height: '6px' }}></div>
                Solta
              </span>
              <span className="flex items-center gap-1">
                <span className="text-red-500 font-bold" style={{ fontSize: '8px' }}>×</span>
                Muda
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

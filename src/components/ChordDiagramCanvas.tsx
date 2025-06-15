
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
    <Card className="w-44">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="font-bold text-base mb-3" style={{ color: '#333447' }}>
            {chord}
          </div>
          
          {/* Diagram */}
          <div className="relative">
            {/* String names */}
            <div className="flex justify-between text-xs font-semibold mb-2" style={{ color: '#333447' }}>
              {stringNames.map((string, i) => (
                <span key={i} className="w-6 text-center">{string}</span>
              ))}
            </div>
            
            {/* Open/Muted indicators */}
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
            
            {/* Enhanced Fretboard */}
            <div 
              className="border-2 border-gray-800 bg-gradient-to-b from-amber-50 to-amber-100 relative shadow-inner" 
              style={{ height: '140px', width: '100%' }}
            >
              {/* Nut (thicker line for first fret) */}
              {displayStartFret === 1 && (
                <div className="absolute w-full border-b-4 border-gray-900" style={{ top: '0px' }} />
              )}
              
              {/* Improved fret lines with shadows */}
              {[...Array(5)].map((_, fretIndex) => (
                <div 
                  key={fretIndex} 
                  className="absolute w-full border-b-2 border-gray-600 shadow-sm"
                  style={{ 
                    top: `${((fretIndex + 1) * 100) / 5}%`,
                    borderColor: fretIndex === 0 ? '#374151' : '#6B7280'
                  }}
                />
              ))}
              
              {/* Enhanced string lines */}
              {[...Array(stringNames.length)].map((_, stringIndex) => (
                <div 
                  key={stringIndex}
                  className="absolute h-full border-l-2 border-gray-400 shadow-sm"
                  style={{ 
                    left: `${((stringIndex * 100) / (stringNames.length - 1))}%`,
                    borderColor: '#9CA3AF'
                  }}
                />
              ))}
              
              {/* Enhanced barres with gradient */}
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
                    className="absolute rounded-full shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #1f2937, #374151)',
                      height: '14px',
                      left: `${leftPercent}%`,
                      width: `${rightPercent - leftPercent}%`,
                      top: `${((fretPosition - 0.5) * 100) / 5 - 7}%`,
                      border: '2px solid #fff',
                      zIndex: 1
                    }}
                  />
                );
              })}
              
              {/* Enhanced finger positions */}
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
                    className="absolute rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg transition-transform hover:scale-110"
                    style={{
                      background: isPartOfBarre 
                        ? 'linear-gradient(135deg, #1f2937, #374151)' 
                        : 'linear-gradient(135deg, #333447, #4a5568)',
                      width: '22px',
                      height: '22px',
                      left: `${((stringIndex * 100) / (stringNames.length - 1)) - 11}px`,
                      top: `${((fretPosition - 0.5) * 100) / 5 - 11}%`,
                      border: '3px solid #fff',
                      zIndex: 2,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                    }}
                  >
                    {!isPartOfBarre && fingerNumber > 0 ? fingerNumber : ''}
                  </div>
                );
              })}
              
              {/* Clearer fret numbers */}
              <div className="absolute -right-8 h-full flex flex-col justify-around text-xs font-bold" style={{ color: '#333447' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-center bg-white bg-opacity-80 rounded px-1">
                    {displayStartFret + i}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Enhanced legend */}
            <div className="mt-3 text-xs space-y-1" style={{ color: '#7F8CAA' }}>
              {barres.length > 0 && (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-6 h-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full border border-white shadow"></div>
                  <span>Pestana (barré)</span>
                </div>
              )}
              <div className="text-center">
                <span>○ = corda solta • × = abafada • números = dedos</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

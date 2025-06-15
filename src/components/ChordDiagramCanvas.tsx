
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
    <Card className="w-48 shadow-lg border-2" style={{ borderColor: '#B8CFCE' }}>
      <CardContent className="p-5">
        <div className="text-center">
          <div className="font-bold text-lg mb-4" style={{ color: '#333447' }}>
            {chord}
          </div>
          
          {/* Diagram Container */}
          <div className="relative mx-auto" style={{ width: '140px' }}>
            {/* String names at top */}
            <div className="flex justify-between text-sm font-bold mb-3" style={{ color: '#333447' }}>
              {stringNames.map((string, i) => (
                <span key={i} className="w-6 text-center bg-gray-100 rounded px-1 py-0.5 shadow-sm">{string}</span>
              ))}
            </div>
            
            {/* Open/Muted indicators */}
            <div className="flex justify-between items-center mb-3">
              {frets.map((fret, stringIndex) => {
                const isOpen = fret === 0;
                const isMuted = fret === -1;
                
                return (
                  <div key={stringIndex} className="w-6 h-5 flex items-center justify-center">
                    {isOpen && (
                      <div className="w-4 h-4 border-3 border-green-600 rounded-full bg-white shadow-md"></div>
                    )}
                    {isMuted && (
                      <div className="text-red-600 text-xl font-black drop-shadow-sm">×</div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Fret position indicator */}
            {displayStartFret > 1 && (
              <div className="absolute -left-10 top-12 text-base font-bold bg-white px-2 py-1 rounded shadow-sm border" style={{ color: '#333447', borderColor: '#B8CFCE' }}>
                {displayStartFret}
ª
              </div>
            )}
            
            {/* Enhanced Fretboard with better proportions */}
            <div 
              className="border-4 relative shadow-lg rounded-sm" 
              style={{ 
                height: '180px', 
                width: '100%',
                background: 'linear-gradient(to bottom, #f9f5f0 0%, #f0e6d2 50%, #e8dcc0 100%)',
                borderColor: '#8B4513'
              }}
            >
              {/* Nut (thicker line for first fret) */}
              {displayStartFret === 1 && (
                <div className="absolute w-full bg-gray-900 shadow-md" style={{ height: '6px', top: '0px' }} />
              )}
              
              {/* Fret lines with better spacing */}
              {[...Array(6)].map((_, fretIndex) => (
                <div 
                  key={fretIndex} 
                  className="absolute w-full bg-gray-700 shadow-sm"
                  style={{ 
                    height: '3px',
                    top: `${((fretIndex + 1) * 100) / 6}%`,
                    backgroundColor: '#4A5568'
                  }}
                />
              ))}
              
              {/* String lines with better visibility */}
              {[...Array(stringNames.length)].map((_, stringIndex) => (
                <div 
                  key={stringIndex}
                  className="absolute h-full bg-gray-500 shadow-sm"
                  style={{ 
                    width: '2px',
                    left: `${((stringIndex * 100) / (stringNames.length - 1))}%`,
                    backgroundColor: '#718096'
                  }}
                />
              ))}
              
              {/* Enhanced barres with better visibility */}
              {barres.map((barre, barreIndex) => {
                const fretPosition = barre.fret - displayStartFret + 1;
                if (fretPosition < 1 || fretPosition > 6) return null;
                
                const leftString = Math.min(barre.fromString, barre.toString) - 1;
                const rightString = Math.max(barre.fromString, barre.toString) - 1;
                const leftPercent = (leftString * 100) / (stringNames.length - 1);
                const rightPercent = (rightString * 100) / (stringNames.length - 1);
                
                return (
                  <div
                    key={barreIndex}
                    className="absolute rounded-full shadow-xl border-2 border-white"
                    style={{
                      background: 'linear-gradient(135deg, #2D3748 0%, #4A5568 50%, #1A202C 100%)',
                      height: '18px',
                      left: `${leftPercent}%`,
                      width: `${rightPercent - leftPercent}%`,
                      top: `${((fretPosition - 0.5) * 100) / 6 - 9}%`,
                      zIndex: 10,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                    }}
                  />
                );
              })}
              
              {/* Enhanced finger positions with better visibility */}
              {frets.map((fret, stringIndex) => {
                if (fret <= 0) return null;
                
                const fingerNumber = fingers[stringIndex];
                const fretPosition = fret - displayStartFret + 1;
                
                if (fretPosition < 1 || fretPosition > 6) return null;
                
                const isPartOfBarre = barres.some(barre => 
                  barre.fret === fret && 
                  stringIndex + 1 >= Math.min(barre.fromString, barre.toString) &&
                  stringIndex + 1 <= Math.max(barre.fromString, barre.toString)
                );
                
                return (
                  <div
                    key={stringIndex}
                    className="absolute rounded-full flex items-center justify-center text-sm font-black text-white shadow-xl border-3 border-white transition-transform hover:scale-110"
                    style={{
                      background: isPartOfBarre 
                        ? 'linear-gradient(135deg, #2D3748 0%, #4A5568 50%, #1A202C 100%)' 
                        : 'linear-gradient(135deg, #333447 0%, #4A5568 50%, #2D3748 100%)',
                      width: '28px',
                      height: '28px',
                      left: `${((stringIndex * 100) / (stringNames.length - 1)) - 14}px`,
                      top: `${((fretPosition - 0.5) * 100) / 6 - 14}%`,
                      zIndex: 20,
                      boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                    }}
                  >
                    {!isPartOfBarre && fingerNumber > 0 ? fingerNumber : ''}
                  </div>
                );
              })}
              
              {/* Fret numbers on the right */}
              <div className="absolute -right-12 h-full flex flex-col justify-around text-sm font-bold" style={{ color: '#333447' }}>
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-center bg-white bg-opacity-90 rounded px-2 py-1 shadow-sm border" style={{ borderColor: '#B8CFCE' }}>
                    {displayStartFret + i}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Enhanced legend with better styling */}
            <div className="mt-4 text-xs space-y-2 p-3 rounded-lg border" style={{ color: '#7F8CAA', backgroundColor: 'rgba(184, 207, 206, 0.1)', borderColor: '#B8CFCE' }}>
              {barres.length > 0 && (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full border-2 border-white shadow-md"></div>
                  <span className="font-medium">Pestana (barré)</span>
                </div>
              )}
              <div className="text-center font-medium">
                <div className="flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 border-2 border-green-600 rounded-full bg-white"></div>
                    Solta
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-red-600 font-bold">×</span>
                    Abafada
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

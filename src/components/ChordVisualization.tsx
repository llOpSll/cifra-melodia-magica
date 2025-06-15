
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChordDiagram } from "./ChordDiagram";
import { Music } from "lucide-react";

type ChordVisualizationProps = {
  cifra: string;
  tomAtual: string;
};

export function ChordVisualization({ cifra, tomAtual }: ChordVisualizationProps) {
  const [selectedInstrument, setSelectedInstrument] = useState<'violao' | 'guitarra' | 'cavaquinho' | 'ukulele'>('violao');
  const [isVisible, setIsVisible] = useState(false);

  // Extract all unique chords from the cifra
  function extractChords(cifraText: string): string[] {
    const chordRegex = /\[([A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)*(?:\([0-9#b,/]+\))?(?:\/[A-G][#b]?)?)\]/g;
    const matches = cifraText.match(chordRegex) || [];
    const chords = matches.map(match => match.slice(1, -1));
    
    const uniqueChords = [...new Set(chords)].sort();
    return uniqueChords;
  }

  const chords = extractChords(cifra);

  if (chords.length === 0) {
    return null;
  }

  const instrumentNames = {
    violao: 'Violão',
    guitarra: 'Guitarra',
    cavaquinho: 'Cavaquinho',
    ukulele: 'Ukulele'
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 mb-3">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          style={{ 
            borderColor: '#D1D5DB',
            backgroundColor: isVisible ? '#F3F4F6' : 'transparent',
            color: '#374151'
          }}
        >
          <Music size={14} />
          {isVisible ? 'Ocultar' : 'Mostrar'} Acordes ({chords.length})
        </Button>
        
        {isVisible && (
          <Select value={selectedInstrument} onValueChange={(value) => setSelectedInstrument(value as any)}>
            <SelectTrigger className="w-32 h-8 text-sm" style={{ borderColor: '#D1D5DB' }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(instrumentNames).map(([key, name]) => (
                <SelectItem key={key} value={key}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {isVisible && (
        <Card className="border" style={{ borderColor: '#E5E7EB', backgroundColor: 'rgba(249, 250, 251, 0.8)' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2" style={{ color: '#374151' }}>
              <Music size={16} />
              Acordes - {instrumentNames[selectedInstrument]} (Tom: {tomAtual})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {chords.map((chord) => (
                <ChordDiagram
                  key={chord}
                  chord={chord}
                  instrument={selectedInstrument}
                />
              ))}
            </div>
            <div className="mt-3 text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>
              <div className="flex flex-wrap gap-4">
                <span>● = corda solta</span>
                <span>× = corda abafada</span>
                <span>1,2,3,4 = dedos</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

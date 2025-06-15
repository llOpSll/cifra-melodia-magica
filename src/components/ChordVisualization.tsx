
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

  // Extrair todos os acordes únicos da cifra
  function extractChords(cifraText: string): string[] {
    const chordRegex = /\[([A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)*(?:\([0-9#b,/]+\))?(?:\/[A-G][#b]?)?)\]/g;
    const matches = cifraText.match(chordRegex) || [];
    const chords = matches.map(match => match.slice(1, -1)); // Remove [ ]
    
    // Remover duplicatas e ordenar
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
    <div className="mt-6">
      <div className="flex items-center gap-3 mb-4">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          variant="outline"
          className="flex items-center gap-2"
          style={{ 
            borderColor: '#B8CFCE',
            backgroundColor: isVisible ? '#B8CFCE' : 'transparent',
            color: isVisible ? '#333447' : '#7F8CAA'
          }}
        >
          <Music size={16} />
          {isVisible ? 'Ocultar' : 'Mostrar'} Acordes ({chords.length})
        </Button>
        
        {isVisible && (
          <Select value={selectedInstrument} onValueChange={(value) => setSelectedInstrument(value as any)}>
            <SelectTrigger className="w-40" style={{ borderColor: '#B8CFCE' }}>
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
        <Card className="border" style={{ borderColor: '#B8CFCE', backgroundColor: 'rgba(234, 239, 239, 0.9)' }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2" style={{ color: '#333447' }}>
              <Music size={20} />
              Acordes - {instrumentNames[selectedInstrument]} (Tom: {tomAtual})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {chords.map((chord) => (
                <ChordDiagram
                  key={chord}
                  chord={chord}
                  instrument={selectedInstrument}
                />
              ))}
            </div>
            <div className="mt-4 text-xs" style={{ color: '#7F8CAA' }}>
              <p>• Círculo verde = corda solta</p>
              <p>• × = corda abafada</p>
              <p>• Números = dedos (1=indicador, 2=médio, 3=anular, 4=mínimo)</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { chordDatabase, stringNames } from "../utils/chordDatabase";
import { ChordImageDisplay } from "./ChordImageDisplay";
import { ChordDiagramCanvas } from "./ChordDiagramCanvas";

type ChordDiagramProps = {
  chord: string;
  instrument: 'violao' | 'guitarra' | 'cavaquinho' | 'ukulele';
};

export function ChordDiagram({ chord, instrument }: ChordDiagramProps) {
  const [useCustomDiagram, setUseCustomDiagram] = useState(false);
  
  // Simplify chord name for lookup
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

  // Try to show image first, fallback to custom diagram
  const shouldShowImage = chordData.imageUrl && !useCustomDiagram && (instrument === 'violao' || instrument === 'guitarra');

  if (shouldShowImage) {
    return (
      <ChordImageDisplay
        chord={chord}
        imageUrl={chordData.imageUrl}
        onImageError={() => setUseCustomDiagram(true)}
      />
    );
  }

  return (
    <ChordDiagramCanvas
      chord={chord}
      chordData={chordData}
      stringNames={stringNames[instrument]}
    />
  );
}

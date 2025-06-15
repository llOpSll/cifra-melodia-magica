
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

type ChordImageDisplayProps = {
  chord: string;
  imageUrl?: string;
  onImageError: () => void;
};

export function ChordImageDisplay({ chord, imageUrl, onImageError }: ChordImageDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return null;
  }

  return (
    <Card className="w-44">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="font-bold text-base mb-3" style={{ color: '#333447' }}>
            {chord}
          </div>
          
          <div className="relative bg-white rounded border overflow-hidden">
            <img
              src={imageUrl}
              alt={`Acorde ${chord}`}
              className={`w-full h-auto transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setHasError(true);
                onImageError();
              }}
              style={{ maxHeight: '160px', objectFit: 'contain' }}
            />
            
            {!imageLoaded && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
              </div>
            )}
          </div>
          
          <div className="mt-2 text-xs" style={{ color: '#7F8CAA' }}>
            Imagem do acorde
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


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
    <Card className="w-32 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
      <CardContent className="p-3">
        <div className="text-center">
          <div className="font-semibold text-sm mb-2" style={{ color: '#374151' }}>
            {chord}
          </div>
          
          <div className="relative bg-white rounded border overflow-hidden" style={{ height: '100px' }}>
            <img
              src={imageUrl}
              alt={`Acorde ${chord}`}
              className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setHasError(true);
                onImageError();
              }}
            />
            
            {!imageLoaded && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

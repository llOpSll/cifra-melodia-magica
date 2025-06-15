
export type ChordData = {
  frets: number[];
  fingers: number[];
  barres: Array<{ fret: number; fromString: number; toString: number }>;
  imageUrl?: string;
};

export type InstrumentChords = {
  [chordName: string]: ChordData;
};

export type ChordDatabase = {
  violao: InstrumentChords;
  guitarra: InstrumentChords;
  cavaquinho: InstrumentChords;
  ukulele: InstrumentChords;
};

// Database with chord images from ChordGitar.com and other sources
export const chordDatabase: ChordDatabase = {
  violao: {
    // Acordes maiores
    'C': { 
      frets: [0, 1, 0, 2, 1, 0], 
      fingers: [0, 1, 0, 3, 2, 0], 
      barres: [],
      imageUrl: 'https://www.chordgitar.com/wp-content/uploads/2019/12/Chord-Gitar-C.png'
    },
    'D': { 
      frets: [-1, -1, 0, 2, 3, 2], 
      fingers: [0, 0, 0, 1, 3, 2], 
      barres: [],
      imageUrl: 'https://www.chordgitar.com/wp-content/uploads/2019/12/Chord-Gitar-D.png'
    },
    'E': { 
      frets: [0, 2, 2, 1, 0, 0], 
      fingers: [0, 2, 3, 1, 0, 0], 
      barres: [],
      imageUrl: 'https://www.chordgitar.com/wp-content/uploads/2019/12/Chord-Gitar-E.png'
    },
    'F': { 
      frets: [1, 3, 3, 2, 1, 1], 
      fingers: [1, 3, 4, 2, 1, 1], 
      barres: [{ fret: 1, fromString: 1, toString: 6 }],
      imageUrl: 'https://www.chordgitar.com/wp-content/uploads/2019/12/Chord-Gitar-F.png'
    },
    'G': { 
      frets: [3, 2, 0, 0, 3, 3], 
      fingers: [3, 1, 0, 0, 4, 4], 
      barres: [],
      imageUrl: 'https://www.chordgitar.com/wp-content/uploads/2019/12/Chord-Gitar-G.png'
    },
    'A': { 
      frets: [-1, 0, 2, 2, 2, 0], 
      fingers: [0, 0, 1, 2, 3, 0], 
      barres: [],
      imageUrl: 'https://www.chordgitar.com/wp-content/uploads/2019/12/Chord-Gitar-A.png'
    },
    'B': { 
      frets: [-1, 2, 4, 4, 4, 2], 
      fingers: [0, 1, 3, 4, 4, 2], 
      barres: [{ fret: 2, fromString: 2, toString: 5 }],
      imageUrl: 'https://guitarspace.org/wp-content/uploads/2020/01/B-major-guitar-chord-diagram.png'
    },
    
    // Acordes menores
    'Am': { 
      frets: [-1, 0, 2, 2, 1, 0], 
      fingers: [0, 0, 2, 3, 1, 0], 
      barres: [],
      imageUrl: 'https://www.chordgitar.com/wp-content/uploads/2019/12/Chord-Gitar-Am.png'
    },
    'Dm': { 
      frets: [-1, -1, 0, 2, 3, 1], 
      fingers: [0, 0, 0, 2, 3, 1], 
      barres: [],
      imageUrl: 'https://www.chordgitar.com/wp-content/uploads/2019/12/Chord-Gitar-Dm.png'
    },
    'Em': { 
      frets: [0, 2, 2, 0, 0, 0], 
      fingers: [0, 2, 3, 0, 0, 0], 
      barres: [],
      imageUrl: 'https://www.chordgitar.com/wp-content/uploads/2019/12/Chord-Gitar-Em.png'
    },
    'Fm': { 
      frets: [1, 3, 3, 1, 1, 1], 
      fingers: [1, 3, 4, 1, 1, 1], 
      barres: [{ fret: 1, fromString: 1, toString: 6 }],
      imageUrl: 'https://guitarspace.org/wp-content/uploads/2020/01/F-minor-guitar-chord-diagram.png'
    },
    'Gm': { 
      frets: [3, 5, 5, 3, 3, 3], 
      fingers: [1, 3, 4, 1, 1, 1], 
      barres: [{ fret: 3, fromString: 1, toString: 6 }],
      imageUrl: 'https://guitarspace.org/wp-content/uploads/2020/01/G-minor-guitar-chord-diagram.png'
    },
    'Cm': { 
      frets: [-1, 3, 5, 5, 4, 3], 
      fingers: [0, 1, 3, 4, 2, 1], 
      barres: [],
      imageUrl: 'https://guitarspace.org/wp-content/uploads/2020/01/C-minor-guitar-chord-diagram.png'
    },
    'Bm': { 
      frets: [-1, 2, 4, 4, 3, 2], 
      fingers: [0, 1, 3, 4, 2, 1], 
      barres: [],
      imageUrl: 'https://guitarspace.org/wp-content/uploads/2020/01/B-minor-guitar-chord-diagram.png'
    },

    // Acordes com sétima
    'C7': { 
      frets: [0, 1, 0, 2, 1, 3], 
      fingers: [0, 1, 0, 2, 1, 4], 
      barres: [],
      imageUrl: 'https://www.guitar-chord.org/images/chords/C7.png'
    },
    'D7': { 
      frets: [-1, -1, 0, 2, 1, 2], 
      fingers: [0, 0, 0, 3, 1, 2], 
      barres: [],
      imageUrl: 'https://www.guitar-chord.org/images/chords/D7.png'
    },
    'E7': { 
      frets: [0, 2, 0, 1, 0, 0], 
      fingers: [0, 2, 0, 1, 0, 0], 
      barres: [],
      imageUrl: 'https://www.guitar-chord.org/images/chords/E7.png'
    },
    'F7': { 
      frets: [1, 3, 1, 2, 1, 1], 
      fingers: [1, 4, 1, 3, 1, 1], 
      barres: [{ fret: 1, fromString: 1, toString: 6 }],
      imageUrl: 'https://www.guitar-chord.org/images/chords/F7.png'
    },
    'G7': { 
      frets: [3, 2, 0, 0, 0, 1], 
      fingers: [3, 2, 0, 0, 0, 1], 
      barres: [],
      imageUrl: 'https://www.guitar-chord.org/images/chords/G7.png'
    },
    'A7': { 
      frets: [-1, 0, 2, 0, 2, 0], 
      fingers: [0, 0, 2, 0, 3, 0], 
      barres: [],
      imageUrl: 'https://www.guitar-chord.org/images/chords/A7.png'
    },
    'B7': { 
      frets: [-1, 2, 1, 2, 0, 2], 
      fingers: [0, 2, 1, 3, 0, 4], 
      barres: [],
      imageUrl: 'https://www.guitar-chord.org/images/chords/B7.png'
    },

    // Sustenidos/bemóis
    'C#': { frets: [-1, -1, 3, 1, 2, 1], fingers: [0, 0, 4, 1, 3, 2], barres: [] },
    'F#': { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 2, fromString: 1, toString: 6 }] },
    'G#': { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 4, fromString: 1, toString: 6 }] },
    'A#': { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 1, fromString: 2, toString: 6 }] },
    'Bb': { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 1, fromString: 2, toString: 6 }] },
    'D#': { frets: [-1, -1, 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3], barres: [] },
    'Eb': { frets: [-1, -1, 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3], barres: [] },

    // Menores sustenidos/bemóis
    'C#m': { frets: [-1, -1, 2, 1, 2, 0], fingers: [0, 0, 3, 1, 4, 0], barres: [] },
    'F#m': { frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 2, fromString: 1, toString: 6 }] },
    'G#m': { frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 4, fromString: 1, toString: 6 }] },
    'A#m': { frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 4, 5, 3, 2], barres: [] },
    'Bbm': { frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 4, 5, 3, 2], barres: [] },

    // Acordes menores com sétima
    'Am7': { frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0], barres: [] },
    'Dm7': { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 3, 1, 2], barres: [] },
    'Em7': { frets: [0, 2, 0, 0, 0, 0], fingers: [0, 2, 0, 0, 0, 0], barres: [] },

    // Acordes suspensos
    'Csus2': { frets: [-1, 3, 0, 0, 1, 3], fingers: [0, 2, 0, 0, 1, 3], barres: [] },
    'Csus4': { frets: [-1, 3, 3, 0, 1, 1], fingers: [0, 3, 4, 0, 1, 2], barres: [] },
    'Dsus2': { frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 2, 0], barres: [] },
    'Dsus4': { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 2, 3], barres: [] },
    'Esus4': { frets: [0, 2, 2, 2, 0, 0], fingers: [0, 1, 2, 3, 0, 0], barres: [] },
    'Gsus4': { frets: [3, 3, 0, 0, 1, 3], fingers: [2, 3, 0, 0, 1, 4], barres: [] },
    'Asus2': { frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0], barres: [] },
    'Asus4': { frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 4, 0], barres: [] },

    // Variações de posição
    'C (pos. 2)': { frets: [-1, 3, 5, 5, 5, 3], fingers: [0, 1, 3, 4, 5, 2], barres: [] },
    'D (pos. 2)': { frets: [5, 5, 7, 7, 7, 5], fingers: [1, 1, 3, 4, 5, 2], barres: [{ fret: 5, fromString: 1, toString: 6 }] },
    'E (pos. 2)': { frets: [7, 9, 9, 8, 7, 7], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 7, fromString: 1, toString: 6 }] }
  },
  guitarra: {
    // Use the same structure as violao for guitar
    'C': { frets: [0, 1, 0, 2, 1, 0], fingers: [0, 1, 0, 3, 2, 0], barres: [] },
    'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], barres: [] },
    'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], barres: [] },
    'F': { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'G': { frets: [3, 2, 0, 0, 3, 3], fingers: [3, 1, 0, 0, 4, 4], barres: [] },
    'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], barres: [] },
    'B': { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 3, 4, 4, 2], barres: [{ fret: 2, fromString: 2, toString: 5 }] },
    'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], barres: [] },
    'Dm': { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], barres: [] },
    'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], barres: [] },
    'Fm': { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'Gm': { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 3, fromString: 1, toString: 6 }] },
    'C7': { frets: [0, 1, 0, 2, 1, 3], fingers: [0, 1, 0, 2, 1, 4], barres: [] },
    'D7': { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 3, 1, 2], barres: [] },
    'E7': { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], barres: [] },
    'F7': { frets: [1, 3, 1, 2, 1, 1], fingers: [1, 4, 1, 3, 1, 1], barres: [{ fret: 1, fromString: 1, toString: 6 }] },
    'G7': { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], barres: [] },
    'A7': { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0], barres: [] },
    'B7': { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], barres: [] }
  },
  cavaquinho: {
    'C': { frets: [0, 0, 0, 3], fingers: [0, 0, 0, 3], barres: [] },
    'D': { frets: [2, 2, 2, 0], fingers: [1, 2, 3, 0], barres: [] },
    'E': { frets: [2, 4, 4, 4], fingers: [1, 2, 3, 4], barres: [] },
    'F': { frets: [3, 5, 5, 5], fingers: [1, 2, 3, 4], barres: [] },
    'G': { frets: [0, 2, 3, 2], fingers: [0, 1, 3, 2], barres: [] },
    'A': { frets: [2, 0, 0, 0], fingers: [2, 0, 0, 0], barres: [] },
    'B': { frets: [4, 2, 2, 2], fingers: [4, 1, 2, 3], barres: [] },
    'Am': { frets: [2, 0, 0, 3], fingers: [2, 0, 0, 3], barres: [] },
    'Dm': { frets: [2, 2, 1, 0], fingers: [2, 3, 1, 0], barres: [] },
    'Em': { frets: [0, 4, 3, 2], fingers: [0, 4, 3, 2], barres: [] },
    'Fm': { frets: [1, 3, 3, 3], fingers: [1, 2, 3, 4], barres: [] },
    'Gm': { frets: [0, 2, 3, 1], fingers: [0, 2, 4, 1], barres: [] }
  },
  ukulele: {
    'C': { frets: [0, 0, 0, 3], fingers: [0, 0, 0, 3], barres: [] },
    'D': { frets: [5, 4, 2, 5], fingers: [3, 2, 1, 4], barres: [] },
    'E': { frets: [4, 4, 4, 7], fingers: [1, 2, 3, 4], barres: [] },
    'F': { frets: [2, 0, 1, 0], fingers: [2, 0, 1, 0], barres: [] },
    'G': { frets: [0, 2, 3, 2], fingers: [0, 1, 3, 2], barres: [] },
    'A': { frets: [2, 1, 0, 0], fingers: [2, 1, 0, 0], barres: [] },
    'B': { frets: [4, 3, 2, 2], fingers: [4, 3, 1, 2], barres: [] },
    'Am': { frets: [2, 0, 0, 0], fingers: [1, 0, 0, 0], barres: [] },
    'Dm': { frets: [2, 2, 1, 0], fingers: [2, 3, 1, 0], barres: [] },
    'Em': { frets: [0, 4, 3, 2], fingers: [0, 3, 2, 1], barres: [] },
    'Fm': { frets: [1, 0, 1, 3], fingers: [1, 0, 2, 4], barres: [] },
    'Gm': { frets: [0, 2, 3, 1], fingers: [0, 2, 3, 1], barres: [] }
  }
};

export const stringNames = {
  violao: ['E', 'A', 'D', 'G', 'B', 'E'],
  guitarra: ['E', 'A', 'D', 'G', 'B', 'E'],
  cavaquinho: ['D', 'G', 'B', 'D'],
  ukulele: ['G', 'C', 'E', 'A']
};

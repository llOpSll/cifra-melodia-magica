
// Tipos compartilhados para o sistema de cifras
export interface Cifra {
  id: string;
  artista: string;
  titulo: string;
  instrumento: string;
  tom: string;
  cifra: string;
  slug: string;
  capotraste?: number; // Casa do capotraste
  bpm?: string; // BPM da música (pode ser texto como "Lento", "Moderado", etc)
  videoYoutube?: string; // URL do vídeo do YouTube
  criadaEm: string;
  atualizadaEm: string;
}

export interface Repertorio {
  id: string;
  nome: string;
  cifras: string[]; // IDs das cifras
  criadoEm: string;
  atualizadoEm: string;
}

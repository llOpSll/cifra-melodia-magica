
import { Cifra } from './storage';

// Função para exportar uma cifra como arquivo .txt
export function exportarCifra(cifra: Cifra): void {
  const conteudo = `Artista: ${cifra.artista}
Título: ${cifra.titulo}
Instrumento: ${cifra.instrumento}
Tom: ${cifra.tom}
Capotraste: ${cifra.capotraste || 0}
BPM: ${cifra.bpm || ''}
VideoYoutube: ${cifra.videoYoutube || ''}

${cifra.cifra}`;

  const blob = new Blob([conteudo], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${cifra.artista.replace(/[^a-zA-Z0-9]/g, '-')}-${cifra.titulo.replace(/[^a-zA-Z0-9]/g, '-')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Função para exportar todas as cifras como arquivo ZIP (simulado com múltiplos downloads)
export function exportarTodasCifras(cifras: Cifra[]): void {
  cifras.forEach((cifra, index) => {
    // Adicionar delay para evitar bloqueio do navegador
    setTimeout(() => {
      exportarCifra(cifra);
    }, index * 500);
  });
}

// Função para importar cifra de arquivo
export function importarCifra(file: File): Promise<Cifra> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const lines = content.split('\n');
        const metadata: Record<string, string> = {};
        let cifraContent = '';
        let parsingMetadata = true;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          
          // Se linha vazia e estávamos parseando metadata, agora começamos o conteúdo
          if (line === '' && parsingMetadata) {
            parsingMetadata = false;
            continue;
          }
          
          if (parsingMetadata && line.includes(':')) {
            // Melhor parsing para metadados - permite acentos e diferentes formatos
            const colonIndex = line.indexOf(':');
            const key = line.substring(0, colonIndex).trim().toLowerCase();
            const value = line.substring(colonIndex + 1).trim();
            
            // Normalizar chaves para variações comuns
            if (key === 'artista') metadata.artista = value;
            else if (key === 'título' || key === 'titulo') metadata.titulo = value;
            else if (key === 'tom') metadata.tom = value;
            else if (key === 'instrumento') metadata.instrumento = value;
            else if (key === 'capotraste') metadata.capotraste = value;
            else if (key === 'bpm') metadata.bpm = value;
            else if (key === 'videoyoutube' || key === 'video youtube' || key === 'youtube') metadata.videoyoutube = value;
          } else if (!parsingMetadata) {
            // Adicionar ao conteúdo da cifra
            cifraContent += line + '\n';
          }
        }

        // Fallbacks para campos obrigatórios
        const artista = metadata.artista || 'Artista Desconhecido';
        const titulo = metadata.titulo || file.name.replace('.txt', '');
        const instrumento = metadata.instrumento || 'Violão';
        const tom = metadata.tom || 'C';
        const capotraste = parseInt(metadata.capotraste || '0');
        const bpm = metadata.bpm || '';
        const videoYoutube = metadata.videoyoutube || '';

        const agora = new Date().toISOString();

        const cifra: Cifra = {
          id: '', // Será gerado ao salvar
          artista,
          titulo,
          instrumento,
          tom,
          cifra: cifraContent.trim(),
          slug: '', // Será gerado ao salvar
          capotraste,
          bpm,
          videoYoutube,
          criadaEm: agora,
          atualizadaEm: agora
        };

        resolve(cifra);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo'));
    reader.readAsText(file);
  });
}

import { Cifra } from './storage';

// Função para exportar uma cifra como arquivo .txt
export function exportarCifra(cifra: Cifra): void {
  const conteudo = `artista: ${cifra.artista}
titulo: ${cifra.titulo}
instrumento: ${cifra.instrumento}
tom: ${cifra.tom}
capotraste: ${cifra.capotraste || 0}
bpm: ${cifra.bpm || ''}
videoYoutube: ${cifra.videoYoutube || ''}

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

        for (const line of lines) {
          if (parsingMetadata && line.includes(':') && !line.startsWith('[')) {
            const [key, ...valueParts] = line.split(':');
            metadata[key.trim().toLowerCase()] = valueParts.join(':').trim();
          } else if (line.trim() === '' && parsingMetadata) {
            parsingMetadata = false;
          } else if (!parsingMetadata) {
            cifraContent += line + '\n';
          }
        }

        const artista = metadata.artista || 'Artista Desconhecido';
        const titulo = metadata.titulo || file.name.replace('.txt', '');
        const instrumento = metadata.instrumento || 'Violão';
        const tom = metadata.tom || 'C';
        const capotraste = parseInt(metadata.capotraste || '0');
        const bpm = parseInt(metadata.bpm || '0');
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

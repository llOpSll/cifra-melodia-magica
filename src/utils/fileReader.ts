
import { Cifra } from './storage';
import slugify from 'slugify';

// Função para parsear o conteúdo de um arquivo de cifra
export function parseCifraFile(filename: string, content: string): Cifra {
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
  const titulo = metadata.titulo || filename.replace('.txt', '');
  const instrumento = metadata.instrumento || 'Violão';
  const tom = metadata.tom || 'C';
  const capotraste = parseInt(metadata.capotraste || '0');

  const agora = new Date().toISOString();
  const slug = slugify(`${artista}-${titulo}`, { lower: true, strict: true });

  return {
    id: `file-${filename}`,
    artista,
    titulo,
    instrumento,
    tom,
    cifra: cifraContent.trim(),
    slug,
    capotraste,
    criadaEm: agora,
    atualizadaEm: agora
  };
}

// Função para carregar cifras dos arquivos
export async function loadCifrasFromFiles(): Promise<Cifra[]> {
  const cifras: Cifra[] = [];
  
  try {
    // Lista de arquivos conhecidos no diretório CIFRAS
    const arquivos = [
      'morada-so-tu-es-santo.txt',
      'oficina-g3-te-escolhi.txt',
      'fernandinho-uma-nova-historia.txt'
    ];

    for (const arquivo of arquivos) {
      try {
        const response = await fetch(`/CIFRAS/${arquivo}`);
        if (response.ok) {
          const content = await response.text();
          const cifra = parseCifraFile(arquivo, content);
          cifras.push(cifra);
        }
      } catch (error) {
        console.log(`Erro ao carregar ${arquivo}:`, error);
      }
    }
  } catch (error) {
    console.log('Erro ao carregar cifras dos arquivos:', error);
  }

  return cifras;
}

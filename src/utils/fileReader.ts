
import { Cifra } from './storage';
import slugify from 'slugify';

// Função para parsear o conteúdo de um arquivo de cifra
export function parseCifraFile(filename: string, content: string): Cifra {
  const lines = content.split('\n');
  let titulo = '';
  let artista = '';
  let instrumento = 'Violão';
  let tom = 'C';
  let capotraste = 0;
  let bpm = '';
  let videoYoutube = '';
  let cifraContent = '';
  let parsingMetadata = true;
  
  // Processar linha por linha
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
      
      // Mapear chaves para variações comuns
      if (key === 'artista') {
        artista = value;
      } else if (key === 'título' || key === 'titulo') {
        titulo = value;
      } else if (key === 'tom') {
        tom = value;
      } else if (key === 'instrumento') {
        instrumento = value;
      } else if (key === 'capotraste') {
        capotraste = parseInt(value) || 0;
      } else if (key === 'bpm') {
        bpm = value;
      } else if (key === 'videoyoutube' || key === 'video youtube' || key === 'youtube') {
        videoYoutube = value;
      }
    } else if (!parsingMetadata) {
      // Adicionar ao conteúdo da cifra
      cifraContent += line + '\n';
    }
  }
  
  // Se não encontrou título e artista nos metadados, extrair do nome do arquivo
  if (!titulo || !artista) {
    const filenameParts = filename.replace('.txt', '').split('-');
    if (filenameParts.length >= 2) {
      // Primeiro parte é o artista, resto é o título
      if (!artista) {
        artista = filenameParts[0]
          .split(/(?=[A-Z])/) // Dividir por maiúsculas
          .join(' ')
          .replace(/\b\w/g, l => l.toUpperCase()) // Capitalizar
          .trim();
      }
      if (!titulo) {
        titulo = filenameParts.slice(1).join(' ')
          .replace(/[-_]/g, ' ')
          .split(/(?=[A-Z])/) // Dividir por maiúsculas  
          .join(' ')
          .replace(/\b\w/g, l => l.toUpperCase()) // Capitalizar
          .replace(/\s+/g, ' ') // Remover espaços duplos
          .trim();
      }
    }
  }
  
  // Fallbacks se ainda não tiver informações
  if (!artista) artista = 'Artista Desconhecido';
  if (!titulo) titulo = filename.replace('.txt', '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Preservar quebras de linha originais do arquivo
  // Converter tags HTML básicas para preservar formatação
  cifraContent = cifraContent
    .replace(/<br\s*\/?>/gi, '\n') // Converter <br> para quebra de linha
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**') // Converter <strong> para markdown bold
    .replace(/<b>(.*?)<\/b>/gi, '**$1**') // Converter <b> para markdown bold
    .replace(/<em>(.*?)<\/em>/gi, '*$1*') // Converter <em> para markdown italic
    .replace(/<i>(.*?)<\/i>/gi, '*$1*') // Converter <i> para markdown italic
    .replace(/<u>(.*?)<\/u>/gi, '_$1_') // Converter <u> para underscore
    .replace(/&nbsp;/gi, ' ') // Converter &nbsp; para espaço
    .replace(/&amp;/gi, '&') // Converter &amp; para &
    .replace(/&lt;/gi, '<') // Converter &lt; para <
    .replace(/&gt;/gi, '>') // Converter &gt; para >
    .trim();

  const agora = new Date().toISOString();
  const slug = slugify(`${artista}-${titulo}`, { lower: true, strict: true });

  return {
    id: `file-${filename}`,
    artista,
    titulo,
    instrumento,
    tom,
    cifra: cifraContent,
    slug,
    capotraste,
    bpm,
    videoYoutube,
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

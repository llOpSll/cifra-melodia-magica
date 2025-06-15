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
  let bpm = 0;
  let videoYoutube = '';
  let cifraContent = '';
  
  // Tentar extrair informações do conteúdo do arquivo
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i].trim();
    
    // Procurar por padrões comuns de título e artista
    if (line.toLowerCase().includes('título:') || line.toLowerCase().includes('titulo:')) {
      titulo = line.split(':')[1]?.trim() || '';
    } else if (line.toLowerCase().includes('artista:')) {
      artista = line.split(':')[1]?.trim() || '';
    } else if (line.toLowerCase().includes('tom:')) {
      tom = line.split(':')[1]?.trim() || 'C';
    } else if (line.toLowerCase().includes('instrumento:')) {
      instrumento = line.split(':')[1]?.trim() || 'Violão';
    } else if (line.toLowerCase().includes('capotraste:')) {
      capotraste = parseInt(line.split(':')[1]?.trim() || '0');
    } else if (line.toLowerCase().includes('bpm:')) {
      bpm = parseInt(line.split(':')[1]?.trim() || '0');
    } else if (line.toLowerCase().includes('videoyoutube:')) {
      videoYoutube = line.split(':')[1]?.trim() || '';
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
  
  // Identificar onde começa o conteúdo da cifra (após metadados)
  let startContent = 0;
  for (let i = 0; i < Math.min(15, lines.length); i++) {
    const line = lines[i].trim();
    if (line.includes(':') && !line.startsWith('[') && 
        (line.toLowerCase().includes('titulo') || line.toLowerCase().includes('artista') || 
         line.toLowerCase().includes('tom') || line.toLowerCase().includes('instrumento') || 
         line.toLowerCase().includes('capotraste'))) {
      startContent = i + 1;
    } else if (line === '' && startContent > 0) {
      // Pular linhas vazias após metadados
      startContent = i + 1;
    } else if (line !== '' && !line.includes(':')) {
      // Encontrou conteúdo que não é metadado
      break;
    }
  }
  
  // Preservar quebras de linha originais do arquivo
  // Converter tags HTML básicas para preservar formatação
  cifraContent = lines.slice(startContent).join('\n')
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

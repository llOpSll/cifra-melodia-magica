
// Leitor de repertórios de arquivos JSON
export interface RepertorioFile {
  id: string;
  nome: string;
  cifras: string[];
  criadoEm: string;
  atualizadoEm: string;
}

// Cache para repertórios dos arquivos
let repertoriosFromFiles: RepertorioFile[] = [];
let repertoriosFromFilesLoaded = false;

export async function loadRepertoriosFromFiles(): Promise<RepertorioFile[]> {
  if (repertoriosFromFilesLoaded) {
    return repertoriosFromFiles;
  }

  try {
    console.log('Carregando repertórios dos arquivos JSON...');
    const response = await fetch('/REPERTORIOS/lista.json');
    
    if (!response.ok) {
      console.log('Arquivo lista.json não encontrado, usando repertórios locais apenas');
      repertoriosFromFilesLoaded = true;
      return [];
    }

    const lista: string[] = await response.json();
    const repertoriosCarregados: RepertorioFile[] = [];
    console.log(`Encontrados ${lista.length} arquivos de repertório para carregar`);

    for (const nomeArquivo of lista) {
      try {
        const responseRepertorio = await fetch(`/REPERTORIOS/${nomeArquivo}`);
        if (responseRepertorio.ok) {
          const repertorio: RepertorioFile = await responseRepertorio.json();
          // Adicionar prefixo 'file-' ao ID para distinguir de repertórios locais
          repertorio.id = `file-${repertorio.id}`;
          repertoriosCarregados.push(repertorio);
          console.log(`Repertório carregado: ${repertorio.nome}`);
        }
      } catch (error) {
        console.log(`Erro ao carregar repertório ${nomeArquivo}:`, error);
      }
    }

    repertoriosFromFiles = repertoriosCarregados;
    repertoriosFromFilesLoaded = true;
    console.log(`${repertoriosCarregados.length} repertórios carregados dos arquivos`);
    
    return repertoriosFromFiles;
  } catch (error) {
    console.log('Erro ao carregar repertórios dos arquivos:', error);
    repertoriosFromFilesLoaded = true;
    return [];
  }
}

export function getRepertoriosFromFiles(): RepertorioFile[] {
  return repertoriosFromFiles;
}

export async function loadFileBasedRepertorios(): Promise<void> {
  if (!repertoriosFromFilesLoaded) {
    await loadRepertoriosFromFiles();
  }
}

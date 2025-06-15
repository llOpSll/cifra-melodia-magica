// Sistema de armazenamento local para cifras
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

const CIFRAS_KEY = 'cifras_app_cifras';
const REPERTORIOS_KEY = 'cifras_app_repertorios';
const CIFRAS_OCULTAS_KEY = 'cifras_app_cifras_ocultas'; // Nova chave para cifras ocultas
const CIFRAS_EXCLUIDAS_KEY = 'cifras_app_cifras_excluidas'; // Nova chave para cifras excluídas permanentemente

// Importar a função para carregar cifras dos arquivos
import { loadCifrasFromFiles } from './fileReader';
import { loadRepertoriosFromFiles, getRepertoriosFromFiles, loadFileBasedRepertorios } from './repertorioFileReader';

// Cache para cifras dos arquivos
let cifrasFromFiles: Cifra[] = [];
let cifrasFromFilesLoaded = false;

// Funções para cifras ocultas
export function getCifrasOcultas(): string[] {
  try {
    const data = localStorage.getItem(CIFRAS_OCULTAS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function ocultarCifra(id: string): boolean {
  if (!id.startsWith('file-')) return false; // Só permite ocultar cifras de arquivo
  
  const cifrasOcultas = getCifrasOcultas();
  if (!cifrasOcultas.includes(id)) {
    cifrasOcultas.push(id);
    localStorage.setItem(CIFRAS_OCULTAS_KEY, JSON.stringify(cifrasOcultas));
  }
  return true;
}

export function mostrarCifra(id: string): boolean {
  const cifrasOcultas = getCifrasOcultas();
  const cifrasOcultasFiltradas = cifrasOcultas.filter(cId => cId !== id);
  
  if (cifrasOcultas.length === cifrasOcultasFiltradas.length) return false;
  
  localStorage.setItem(CIFRAS_OCULTAS_KEY, JSON.stringify(cifrasOcultasFiltradas));
  return true;
}

// Funções para cifras excluídas permanentemente
export function getCifrasExcluidas(): string[] {
  try {
    const data = localStorage.getItem(CIFRAS_EXCLUIDAS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function excluirCifraPermanentemente(id: string): boolean {
  if (!id.startsWith('file-')) return false; // Só permite excluir cifras de arquivo
  
  const cifrasExcluidas = getCifrasExcluidas();
  if (!cifrasExcluidas.includes(id)) {
    cifrasExcluidas.push(id);
    localStorage.setItem(CIFRAS_EXCLUIDAS_KEY, JSON.stringify(cifrasExcluidas));
  }
  
  // Também remover das cifras ocultas se estiver lá
  mostrarCifra(id);
  
  return true;
}

export function restaurarCifraExcluida(id: string): boolean {
  const cifrasExcluidas = getCifrasExcluidas();
  const cifrasExcluidasFiltradas = cifrasExcluidas.filter(cId => cId !== id);
  
  if (cifrasExcluidas.length === cifrasExcluidasFiltradas.length) return false;
  
  localStorage.setItem(CIFRAS_EXCLUIDAS_KEY, JSON.stringify(cifrasExcluidasFiltradas));
  return true;
}

export function getCifras(): Cifra[] {
  try {
    const data = localStorage.getItem(CIFRAS_KEY);
    const cifrasLocalStorage = data ? JSON.parse(data) : [];
    const cifrasOcultas = getCifrasOcultas();
    const cifrasExcluidas = getCifrasExcluidas();
    
    // Filtrar cifras ocultas e excluídas das cifras dos arquivos
    const cifrasArquivosVisiveis = cifrasFromFiles.filter(c => 
      !cifrasOcultas.includes(c.id) && !cifrasExcluidas.includes(c.id)
    );
    
    // Combinar cifras do localStorage com cifras dos arquivos (exceto ocultas e excluídas)
    return [...cifrasArquivosVisiveis, ...cifrasLocalStorage];
  } catch {
    const cifrasOcultas = getCifrasOcultas();
    const cifrasExcluidas = getCifrasExcluidas();
    return cifrasFromFiles.filter(c => 
      !cifrasOcultas.includes(c.id) && !cifrasExcluidas.includes(c.id)
    );
  }
}

// Função para carregar cifras dos arquivos (chamada uma vez)
export async function loadFileBasedCifras(): Promise<void> {
  if (!cifrasFromFilesLoaded) {
    try {
      cifrasFromFiles = await loadCifrasFromFiles();
      cifrasFromFilesLoaded = true;
    } catch (error) {
      console.log('Erro ao carregar cifras dos arquivos:', error);
      cifrasFromFiles = [];
      cifrasFromFilesLoaded = true;
    }
  }
}

export function getCifraById(id: string): Cifra | null {
  const cifras = getCifras();
  return cifras.find(c => c.id === id) || null;
}

export function getCifraBySlug(slug: string): Cifra | null {
  const cifras = getCifras();
  return cifras.find(c => c.slug === slug) || null;
}

// Salvar cifra apenas no localStorage (cifras dos arquivos são read-only)
export function salvarCifra(cifra: Omit<Cifra, 'id' | 'criadaEm' | 'atualizadaEm'>): string {
  const cifrasLocalStorage = getCifrasFromLocalStorage();
  const agora = new Date().toISOString();
  const novaCifra: Cifra = {
    ...cifra,
    id: generateId(),
    criadaEm: agora,
    atualizadaEm: agora
  };
  
  cifrasLocalStorage.push(novaCifra);
  localStorage.setItem(CIFRAS_KEY, JSON.stringify(cifrasLocalStorage));
  return novaCifra.id;
}

// Função auxiliar para pegar apenas cifras do localStorage
function getCifrasFromLocalStorage(): Cifra[] {
  try {
    const data = localStorage.getItem(CIFRAS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function atualizarCifra(id: string, dados: Partial<Omit<Cifra, 'id' | 'criadaEm'>>): boolean {
  // Só permite editar cifras do localStorage (não dos arquivos)
  if (id.startsWith('file-')) {
    return false; // Cifras dos arquivos são read-only
  }
  
  const cifrasLocalStorage = getCifrasFromLocalStorage();
  const index = cifrasLocalStorage.findIndex(c => c.id === id);
  
  if (index === -1) return false;
  
  cifrasLocalStorage[index] = {
    ...cifrasLocalStorage[index],
    ...dados,
    atualizadaEm: new Date().toISOString()
  };
  
  localStorage.setItem(CIFRAS_KEY, JSON.stringify(cifrasLocalStorage));
  return true;
}

export function deletarCifra(id: string): boolean {
  // Para cifras de arquivo, usar exclusão permanente
  if (id.startsWith('file-')) {
    return excluirCifraPermanentemente(id);
  }
  
  // Para cifras do localStorage, continuar com a lógica atual
  const cifrasLocalStorage = getCifrasFromLocalStorage();
  const cifrasFiltradas = cifrasLocalStorage.filter(c => c.id !== id);
  
  if (cifrasLocalStorage.length === cifrasFiltradas.length) return false;
  
  localStorage.setItem(CIFRAS_KEY, JSON.stringify(cifrasFiltradas));
  
  // Remover das playlists também
  const repertorios = getRepertorios();
  repertorios.forEach(r => {
    if (r.cifras.includes(id)) {
      r.cifras = r.cifras.filter(cId => cId !== id);
      r.atualizadoEm = new Date().toISOString();
    }
  });
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertorios));
  
  return true;
}

// Funções para repertórios - ATUALIZADAS
export function getRepertorios(): Repertorio[] {
  try {
    const data = localStorage.getItem(REPERTORIOS_KEY);
    const repertoriosLocalStorage = data ? JSON.parse(data) : [];
    
    // Combinar repertórios do localStorage com repertórios dos arquivos
    const repertoriosArquivos = getRepertoriosFromFiles();
    
    return [...repertoriosArquivos, ...repertoriosLocalStorage];
  } catch {
    return getRepertoriosFromFiles();
  }
}

// Função para carregar repertórios dos arquivos (chamada uma vez)
export async function loadFileBasedRepertorios(): Promise<void> {
  await loadFileBasedRepertorios();
}

export function getRepertorioById(id: string): Repertorio | null {
  const repertorios = getRepertorios();
  return repertorios.find(r => r.id === id) || null;
}

// Função auxiliar para pegar apenas repertórios do localStorage
function getRepertoriosFromLocalStorage(): Repertorio[] {
  try {
    const data = localStorage.getItem(REPERTORIOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function salvarRepertorio(nome: string, cifrasIds: string[] = []): string {
  const repertoriosLocalStorage = getRepertoriosFromLocalStorage();
  const agora = new Date().toISOString();
  const novoRepertorio: Repertorio = {
    id: generateId(),
    nome,
    cifras: cifrasIds,
    criadoEm: agora,
    atualizadoEm: agora
  };
  
  repertoriosLocalStorage.push(novoRepertorio);
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertoriosLocalStorage));
  return novoRepertorio.id;
}

export function atualizarRepertorio(id: string, dados: Partial<Omit<Repertorio, 'id' | 'criadoEm'>>): boolean {
  // Só permite editar repertórios do localStorage (não dos arquivos)
  if (id.startsWith('file-')) {
    return false; // Repertórios dos arquivos são read-only
  }
  
  const repertoriosLocalStorage = getRepertoriosFromLocalStorage();
  const index = repertoriosLocalStorage.findIndex(r => r.id === id);
  
  if (index === -1) return false;
  
  repertoriosLocalStorage[index] = {
    ...repertoriosLocalStorage[index],
    ...dados,
    atualizadoEm: new Date().toISOString()
  };
  
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertoriosLocalStorage));
  return true;
}

export function deletarRepertorio(id: string): boolean {
  // Não permite deletar repertórios dos arquivos
  if (id.startsWith('file-')) {
    return false; // Repertórios dos arquivos são read-only
  }
  
  const repertoriosLocalStorage = getRepertoriosFromLocalStorage();
  const repertoriosFiltrados = repertoriosLocalStorage.filter(r => r.id !== id);
  
  if (repertoriosLocalStorage.length === repertoriosFiltrados.length) return false;
  
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertoriosFiltrados));
  return true;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Modificar função de inicialização para carregar repertórios de arquivos
export function inicializarDadosExemplo() {
  const cifras = getCifrasFromLocalStorage();
  
  // Se já há cifras no localStorage, não fazer nada
  if (cifras.length > 0) {
    return;
  }
  
  // Só adicionar exemplos se não há cifras no localStorage
  // As cifras dos arquivos já serão carregadas automaticamente
  console.log('Cifras dos arquivos carregadas. Exemplos do localStorage não são mais necessários.');
}

// Função para criar versão editável de cifra de arquivo
export function criarVersaoEditavel(cifraOriginal: Cifra): string {
  const cifrasLocalStorage = getCifrasFromLocalStorage();
  const agora = new Date().toISOString();
  
  // Remover prefixo 'file-' e criar nova versão
  const novaCifra: Cifra = {
    ...cifraOriginal,
    id: generateId(),
    criadaEm: agora,
    atualizadaEm: agora
  };
  
  cifrasLocalStorage.push(novaCifra);
  localStorage.setItem(CIFRAS_KEY, JSON.stringify(cifrasLocalStorage));
  
  // Ocultar a cifra original do arquivo
  ocultarCifra(cifraOriginal.id);
  
  return novaCifra.id;
}

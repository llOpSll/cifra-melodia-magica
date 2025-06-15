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

// Importar a função para carregar cifras dos arquivos
import { loadCifrasFromFiles } from './fileReader';

// Cache para cifras dos arquivos
let cifrasFromFiles: Cifra[] = [];
let cifrasFromFilesLoaded = false;

// Funções para cifras
export function getCifras(): Cifra[] {
  try {
    const data = localStorage.getItem(CIFRAS_KEY);
    const cifrasLocalStorage = data ? JSON.parse(data) : [];
    
    // Combinar cifras do localStorage com cifras dos arquivos
    return [...cifrasFromFiles, ...cifrasLocalStorage];
  } catch {
    return [...cifrasFromFiles];
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
  // Só permite deletar cifras do localStorage (não dos arquivos)
  if (id.startsWith('file-')) {
    return false; // Cifras dos arquivos são read-only
  }
  
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

// Funções para repertórios
export function getRepertorios(): Repertorio[] {
  try {
    const data = localStorage.getItem(REPERTORIOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getRepertorioById(id: string): Repertorio | null {
  const repertorios = getRepertorios();
  return repertorios.find(r => r.id === id) || null;
}

export function salvarRepertorio(nome: string, cifrasIds: string[] = []): string {
  const repertorios = getRepertorios();
  const agora = new Date().toISOString();
  const novoRepertorio: Repertorio = {
    id: generateId(),
    nome,
    cifras: cifrasIds,
    criadoEm: agora,
    atualizadoEm: agora
  };
  
  repertorios.push(novoRepertorio);
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertorios));
  return novoRepertorio.id;
}

export function atualizarRepertorio(id: string, dados: Partial<Omit<Repertorio, 'id' | 'criadoEm'>>): boolean {
  const repertorios = getRepertorios();
  const index = repertorios.findIndex(r => r.id === id);
  
  if (index === -1) return false;
  
  repertorios[index] = {
    ...repertorios[index],
    ...dados,
    atualizadoEm: new Date().toISOString()
  };
  
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertorios));
  return true;
}

export function deletarRepertorio(id: string): boolean {
  const repertorios = getRepertorios();
  const repertoriosFiltrados = repertorios.filter(r => r.id !== id);
  
  if (repertorios.length === repertoriosFiltrados.length) return false;
  
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertoriosFiltrados));
  return true;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Modificar função de inicialização para não sobrescrever cifras dos arquivos
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

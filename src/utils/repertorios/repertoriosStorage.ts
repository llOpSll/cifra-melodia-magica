
// Funções para gerenciar repertórios no localStorage e arquivos
import { Repertorio } from '../types';
import { getRepertoriosFromFiles, loadFileBasedRepertorios } from '../repertorioFileReader';

const REPERTORIOS_KEY = 'cifras_app_repertorios';

export async function loadRepertorios(): Promise<void> {
  await loadFileBasedRepertorios();
}

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

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
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

// Função para remover cifra de todos os repertórios
export function removerCifraDeRepertorios(cifraId: string): void {
  const repertorios = getRepertoriosFromLocalStorage(); // Só repertórios do localStorage podem ser editados
  let mudou = false;
  
  repertorios.forEach(r => {
    if (r.cifras.includes(cifraId)) {
      r.cifras = r.cifras.filter(cId => cId !== cifraId);
      r.atualizadoEm = new Date().toISOString();
      mudou = true;
    }
  });
  
  if (mudou) {
    localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertorios));
  }
}

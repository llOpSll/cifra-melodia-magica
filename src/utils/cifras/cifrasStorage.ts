
// Funções para gerenciar cifras no localStorage e arquivos
import { Cifra } from '../types';
import { loadCifrasFromFiles } from '../fileReader';
import { getCifrasOcultas, getCifrasExcluidas, excluirCifraPermanentemente, mostrarCifra } from './cifrasVisibility';

const CIFRAS_KEY = 'cifras_app_cifras';

// Cache para cifras dos arquivos
let cifrasFromFiles: Cifra[] = [];
let cifrasFromFilesLoaded = false;

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

export function getCifraById(id: string): Cifra | null {
  const cifras = getCifras();
  return cifras.find(c => c.id === id) || null;
}

export function getCifraBySlug(slug: string): Cifra | null {
  const cifras = getCifras();
  return cifras.find(c => c.slug === slug) || null;
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

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
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
  return true;
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
  mostrarCifra(cifraOriginal.id);
  
  return novaCifra.id;
}

// Função removida - não criar mais dados de exemplo
export function inicializarDadosExemplo() {
  // App em produção - sem dados de exemplo
  console.log('App em produção - sem dados de exemplo');
}

// Nova função para limpar todos os dados
export function limparTodosDados(): void {
  localStorage.removeItem(CIFRAS_KEY);
  localStorage.removeItem('cifras_app_cifras_ocultas');
  localStorage.removeItem('cifras_app_cifras_excluidas');
  localStorage.removeItem('cifras_app_repertorios');
  console.log('Todos os dados foram limpos');
}

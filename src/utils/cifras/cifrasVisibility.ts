
// Funções para gerenciar visibilidade de cifras (ocultar/excluir)
const CIFRAS_OCULTAS_KEY = 'cifras_app_cifras_ocultas';
const CIFRAS_EXCLUIDAS_KEY = 'cifras_app_cifras_excluidas';

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

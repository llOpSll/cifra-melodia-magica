
// Arquivo principal de storage - re-exports das funções organizadas
export * from './types';

// Cifras
export {
  getCifras,
  getCifraById,
  getCifraBySlug,
  salvarCifra,
  atualizarCifra,
  deletarCifra as deletarCifraOriginal,
  loadFileBasedCifras,
  criarVersaoEditavel,
  inicializarDadosExemplo,
  limparTodosDados
} from './cifras/cifrasStorage';

// Visibilidade das cifras
export {
  getCifrasOcultas,
  ocultarCifra,
  mostrarCifra,
  getCifrasExcluidas,
  excluirCifraPermanentemente,
  restaurarCifraExcluida
} from './cifras/cifrasVisibility';

// Repertórios
export {
  getRepertorios,
  getRepertorioById,
  salvarRepertorio,
  atualizarRepertorio,
  deletarRepertorio,
  loadRepertorios as loadFileBasedRepertorios,
  removerCifraDeRepertorios
} from './repertorios/repertoriosStorage';

// Importar funções necessárias para o wrapper
import { deletarCifra as deletarCifraOriginal } from './cifras/cifrasStorage';
import { removerCifraDeRepertorios } from './repertorios/repertoriosStorage';

// Wrapper da função deletarCifra que também remove de repertórios
export function deletarCifra(id: string): boolean {
  const resultado = deletarCifraOriginal(id);
  
  if (resultado && !id.startsWith('file-')) {
    // Remover das playlists também (só para cifras do localStorage)
    removerCifraDeRepertorios(id);
  }
  
  return resultado;
}

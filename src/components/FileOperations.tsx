
import { useState } from 'react';
import { Download, Upload, FileText, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Cifra, getCifras, loadFileBasedCifras } from '../utils/storage';
import { exportarCifra, exportarTodasCifras, importarCifra } from '../utils/fileOperations';
import { uploadCifraToServer, refreshCifrasList } from '../utils/uploadService';
import { toast } from '@/hooks/use-toast';

interface Props {
  cifras: Cifra[];
  onCifrasUpdated: () => void;
}

export function FileOperations({ cifras, onCifrasUpdated }: Props) {
  const [importando, setImportando] = useState(false);
  const [atualizandoLista, setAtualizandoLista] = useState(false);

  function handleExportarTodas() {
    if (cifras.length === 0) {
      toast({
        title: "Nenhuma cifra para exportar",
      });
      return;
    }
    
    exportarTodasCifras(cifras);
    toast({
      title: `Exportando ${cifras.length} cifras...`,
      description: "Os arquivos serão baixados automaticamente.",
    });
  }

  async function handleImportar(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setImportando(true);
    let sucessos = 0;
    let erros = 0;

    for (const file of Array.from(files)) {
      try {
        const cifra = await importarCifra(file);
        
        // Criar conteúdo formatado para o arquivo
        const conteudoFormatado = `Artista: ${cifra.artista}
Título: ${cifra.titulo}
Instrumento: ${cifra.instrumento}
Tom: ${cifra.tom}
Capotraste: ${cifra.capotraste || 0}
BPM: ${cifra.bpm || ''}
VideoYoutube: ${cifra.videoYoutube || ''}

${cifra.cifra}`;

        // Fazer upload para o servidor
        const nomeArquivo = `${cifra.artista.replace(/[^a-zA-Z0-9\s]/g, '').trim()} - ${cifra.titulo.replace(/[^a-zA-Z0-9\s]/g, '').trim()}.txt`;
        const uploadSucesso = await uploadCifraToServer(conteudoFormatado, nomeArquivo);
        
        if (uploadSucesso) {
          sucessos++;
        } else {
          erros++;
        }
      } catch (error) {
        console.error('Erro ao importar arquivo:', file.name, error);
        erros++;
      }
    }

    setImportando(false);
    
    if (sucessos > 0) {
      toast({
        title: `${sucessos} cifra(s) enviada(s) para o servidor!`,
        description: erros > 0 ? `${erros} arquivo(s) falharam no upload. Atualize a lista para ver as cifras.` : "Atualize a lista para ver as novas cifras.",
      });
    } else {
      toast({
        title: "Erro ao enviar cifras",
        description: "Verifique se os arquivos estão no formato correto e se o servidor está funcionando.",
      });
    }

    // Limpar input
    event.target.value = '';
  }

  async function handleAtualizarLista() {
    setAtualizandoLista(true);
    
    try {
      // Atualizar lista no servidor
      await refreshCifrasList();
      
      // Recarregar cifras dos arquivos
      await loadFileBasedCifras();
      
      // Atualizar UI
      onCifrasUpdated();
      
      toast({
        title: "Lista atualizada!",
        description: "As novas cifras já estão disponíveis.",
      });
    } catch (error) {
      console.error('Erro ao atualizar lista:', error);
      toast({
        title: "Erro ao atualizar lista",
        description: "Tente novamente em alguns segundos.",
      });
    }
    
    setAtualizandoLista(false);
  }

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 items-stretch sm:items-center">
      <Button
        onClick={handleExportarTodas}
        variant="outline"
        size="sm"
        className="flex items-center justify-center gap-2 text-xs sm:text-sm"
        disabled={cifras.length === 0}
      >
        <Download size={14} className="sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Exportar Todas ({cifras.length})</span>
        <span className="sm:hidden">Exportar ({cifras.length})</span>
      </Button>
      
      <div className="relative">
        <input
          type="file"
          multiple
          accept=".txt"
          onChange={handleImportar}
          disabled={importando}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="importar-cifras"
        />
        <Button
          variant="outline"
          size="sm"
          className="flex items-center justify-center gap-2 w-full text-xs sm:text-sm"
          disabled={importando}
          asChild
        >
          <label htmlFor="importar-cifras" className="cursor-pointer">
            <Upload size={14} className="sm:w-4 sm:h-4" />
            {importando ? 'Enviando...' : (
              <>
                <span className="hidden sm:inline">Enviar para Servidor</span>
                <span className="sm:hidden">Enviar</span>
              </>
            )}
          </label>
        </Button>
      </div>

      <Button
        onClick={handleAtualizarLista}
        variant="outline"
        size="sm"
        className="flex items-center justify-center gap-2 text-xs sm:text-sm"
        disabled={atualizandoLista}
      >
        <RefreshCw size={14} className={`sm:w-4 sm:h-4 ${atualizandoLista ? 'animate-spin' : ''}`} />
        {atualizandoLista ? (
          <>
            <span className="hidden sm:inline">Atualizando...</span>
            <span className="sm:hidden">Atualizando</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">Atualizar Lista</span>
            <span className="sm:hidden">Atualizar</span>
          </>
        )}
      </Button>
      
      <div className="text-xs text-gray-500 flex items-center gap-1 justify-center sm:justify-start">
        <FileText size={10} className="sm:w-3 sm:h-3" />
        <span className="hidden lg:inline">Formato: artista:, titulo:, tom:, cifra</span>
        <span className="lg:hidden">Formato TXT</span>
      </div>
      
      <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded text-center">
        <span className="hidden sm:inline">📤 Arquivos enviados ficam disponíveis para todos</span>
        <span className="sm:hidden">📤 Compartilhado</span>
      </div>
    </div>
  );
}

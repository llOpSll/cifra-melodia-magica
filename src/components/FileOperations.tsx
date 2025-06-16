
import { useState } from 'react';
import { Download, Upload, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Cifra, getCifras, salvarCifra } from '../utils/storage';
import { exportarCifra, exportarTodasCifras, importarCifra } from '../utils/fileOperations';
import { toast } from '@/hooks/use-toast';
import slugify from 'slugify';

interface Props {
  cifras: Cifra[];
  onCifrasUpdated: () => void;
}

export function FileOperations({ cifras, onCifrasUpdated }: Props) {
  const [importando, setImportando] = useState(false);

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
        const slug = slugify(`${cifra.artista}-${cifra.titulo}`, { lower: true, strict: true });
        
        salvarCifra({
          artista: cifra.artista,
          titulo: cifra.titulo,
          instrumento: cifra.instrumento,
          tom: cifra.tom,
          cifra: cifra.cifra,
          slug,
          capotraste: cifra.capotraste
        });
        
        sucessos++;
      } catch (error) {
        console.error('Erro ao importar arquivo:', file.name, error);
        erros++;
      }
    }

    setImportando(false);
    
    if (sucessos > 0) {
      toast({
        title: `${sucessos} cifra(s) importada(s) com sucesso!`,
        description: erros > 0 ? `${erros} arquivo(s) falharam na importação.` : undefined,
      });
      onCifrasUpdated();
    } else {
      toast({
        title: "Erro ao importar cifras",
        description: "Verifique se os arquivos estão no formato correto.",
      });
    }

    // Limpar input
    event.target.value = '';
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
            {importando ? 'Importando...' : (
              <>
                <span className="hidden sm:inline">Importar TXT</span>
                <span className="sm:hidden">Importar</span>
              </>
            )}
          </label>
        </Button>
      </div>
      
      <div className="text-xs text-gray-500 flex items-center gap-1 justify-center sm:justify-start">
        <FileText size={10} className="sm:w-3 sm:h-3" />
        <span className="hidden lg:inline">Formato: artista:, titulo:, tom:, cifra</span>
        <span className="lg:hidden">Formato TXT</span>
      </div>
      
      <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded text-center">
        <span className="hidden sm:inline">⚠️ Importação em massa não disponível no iPad 2</span>
        <span className="sm:hidden">⚠️ Não disponível no iPad 2</span>
      </div>
    </div>
  );
}

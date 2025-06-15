
import { Link } from "react-router-dom";
import { Cifra } from "../utils/storage";
import { FileText, Download } from "lucide-react";
import { exportarCifra } from "../utils/fileOperations";
import { toast } from "@/hooks/use-toast";

type Props = {
  cifra: Cifra;
};

export function CifraCard({ cifra }: Props) {
  const isFromFile = cifra.id.startsWith('file-');
  
  function handleExportar(e: React.MouseEvent) {
    e.preventDefault(); // Evitar navegação
    e.stopPropagation();
    
    exportarCifra(cifra);
    toast({
      title: "Cifra exportada!",
      description: `${cifra.titulo} - ${cifra.artista}`,
    });
  }
  
  return (
    <div className="block bg-white/80 rounded-2xl shadow-md hover:shadow-lg transition-all p-6 min-h-[180px] border border-green-100 relative group">
      <Link
        to={`/cifras/${cifra.slug}`}
        className="block"
        style={{ textDecoration: "none" }}
      >
        <div className="flex items-center justify-between text-sm mb-1 text-gray-400">
          <span>{cifra.instrumento} • Tom {cifra.tom.replace(/0+$/, '')}</span>
          {isFromFile && (
            <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs">
              <FileText size={12} />
              Arquivo
            </div>
          )}
        </div>
        <h2 className="font-bold text-xl mb-2 text-primary">{cifra.titulo}</h2>
        <div className="font-semibold text-green-700 text-md mb-1">{cifra.artista}</div>
        <pre className="h-12 overflow-hidden text-xs font-mono text-gray-500 leading-snug">{cifra.cifra.split("\n")[0]}</pre>
      </Link>
      
      {/* Botão de exportar */}
      <button
        onClick={handleExportar}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white rounded-full p-2 shadow-md"
        title="Exportar cifra"
      >
        <Download size={14} className="text-gray-600" />
      </button>
    </div>
  );
}


import { useState, useEffect } from "react";
import { CifraCard } from "../components/CifraCard";
import { FileOperations } from "../components/FileOperations";
import { Link } from "react-router-dom";
import { Music, List, Trash2 } from "lucide-react";
import { getCifras, inicializarDadosExemplo, loadFileBasedCifras, limparTodosDados } from "../utils/storage";
import { toast } from "@/hooks/use-toast";

export default function Index() {
  const [busca, setBusca] = useState("");
  const [cifras, setCifras] = useState(getCifras());
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarCifras() {
      setCarregando(true);
      
      // Carregar cifras dos arquivos primeiro
      await loadFileBasedCifras();
      
      // Inicializar dados de exemplo se necessário (agora vazio para produção)
      inicializarDadosExemplo();
      
      // Atualizar estado com todas as cifras
      setCifras(getCifras());
      setCarregando(false);
    }

    carregarCifras();
  }, []);

  function handleCifrasUpdated() {
    setCifras(getCifras());
  }

  function handleLimparTodosDados() {
    if (confirm('Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita.')) {
      limparTodosDados();
      setCifras(getCifras());
      toast({
        title: "Todos os dados foram limpos!",
        description: "O app foi resetado para o estado inicial.",
      });
    }
  }

  const cifrasFiltradas = cifras.filter(
    c =>
      c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      c.artista.toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg px-4"
           style={{ color: '#7F8CAA', background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)' }}>
        Carregando cifras...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-12 px-2 sm:px-4 font-sans"
         style={{ background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)' }}>
      <header className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-10 gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold flex gap-2 items-center text-center sm:text-left" style={{ color: '#333447' }}>
          <Music size={24} className="sm:w-8 sm:h-8" style={{ color: '#7F8CAA' }} />
          CifrasApp
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Link
            to="/repertorios"
            className="rounded-full text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg shadow-lg transition-all flex items-center justify-center gap-2 hover:opacity-80"
            style={{ backgroundColor: '#7F8CAA' }}
          >
            <List size={16} className="sm:w-5 sm:h-5" />
            Repertórios
          </Link>
          <Link
            to="/nova"
            className="rounded-full text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg shadow-lg transition-all hover:opacity-80"
            style={{ backgroundColor: '#333447' }}
          >
            + Nova Cifra
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl flex flex-col gap-4 mb-6 sm:mb-8 px-2">
        <input
          type="text"
          placeholder="Buscar por artista ou música..."
          className="w-full p-3 rounded-lg border text-base sm:text-lg"
          style={{ borderColor: '#B8CFCE', backgroundColor: 'rgba(234, 239, 239, 0.9)', color: '#333447' }}
          value={busca}
          onChange={e => setBusca(e.target.value)}
          aria-label="Buscar"
        />
        
        {/* Operações de arquivo - melhor responsividade */}
        <div className="bg-white/80 rounded-lg p-3 sm:p-4 border border-green-100">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
            <div className="w-full lg:flex-1">
              <FileOperations cifras={cifras} onCifrasUpdated={handleCifrasUpdated} />
            </div>
            <button
              onClick={handleLimparTodosDados}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm sm:text-base w-full lg:w-auto"
            >
              <Trash2 size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Limpar Todos os Dados</span>
              <span className="sm:hidden">Limpar Dados</span>
            </button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2">
        {cifrasFiltradas.length ? (
          cifrasFiltradas.map(cifra => <CifraCard key={cifra.id} cifra={cifra} />)
        ) : (
          <div className="col-span-full text-base sm:text-lg text-center" style={{ color: '#7F8CAA' }}>
            <div className="bg-white/80 rounded-lg p-6 sm:p-8 border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ color: '#333447' }}>
                Bem-vindo ao CifrasApp!
              </h3>
              <p className="mb-4 text-sm sm:text-base">
                Seu aplicativo está pronto para uso em produção.
              </p>
              <div className="flex flex-col gap-3 items-center">
                <Link
                  to="/nova"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all text-sm sm:text-base"
                >
                  + Criar sua primeira cifra
                </Link>
                <Link
                  to="/repertorios/novo"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all text-sm sm:text-base"
                >
                  + Criar seu primeiro repertório
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
      
      {/* Indicador de fonte das cifras */}
      <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm px-4" style={{ color: '#7F8CAA' }}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>{cifras.filter(c => c.id.startsWith('file-')).length} cifras do diretório CIFRAS/</span>
          <span className="hidden sm:inline">•</span>
          <span>{cifras.filter(c => !c.id.startsWith('file-')).length} cifras criadas no app</span>
        </div>
      </div>
      
      <footer className="mt-6 sm:mt-8 text-xs sm:text-sm text-center px-4" style={{ color: '#7F8CAA' }}>
        © {new Date().getFullYear()} CifrasApp · Feito com amor 🎸
      </footer>
    </div>
  );
}

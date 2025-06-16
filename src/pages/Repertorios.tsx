
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music, Plus, ArrowLeft, Edit, Trash2, Play, Globe, User } from "lucide-react";
import { getRepertorios, deletarRepertorio } from "../utils/storage";
import { toast } from "@/hooks/use-toast";

export default function Repertorios() {
  const [repertorios, setRepertorios] = useState(getRepertorios());
  const navigate = useNavigate();

  useEffect(() => {
    setRepertorios(getRepertorios());
  }, []);

  function handleDelete(id: string, nome: string) {
    // Verificar se é repertório de arquivo (não pode ser deletado)
    if (id.startsWith('file-')) {
      toast({
        title: "Este repertório não pode ser excluído",
        description: "Repertórios compartilhados são somente leitura.",
      });
      return;
    }

    if (confirm(`Tem certeza que deseja excluir o repertório "${nome}"?`)) {
      const sucesso = deletarRepertorio(id);
      if (sucesso) {
        toast({
          title: "Repertório excluído com sucesso!",
        });
        setRepertorios(getRepertorios());
      } else {
        toast({
          title: "Erro ao excluir o repertório.",
        });
      }
    }
  }

  return (
    <div className="min-h-screen py-6 sm:py-12 px-2 sm:px-4 font-sans" 
         style={{ background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)' }}>
      <header className="mx-auto max-w-5xl mb-6 sm:mb-10">
        <button
          onClick={() => navigate("/")}
          className="mb-4 sm:mb-6 flex items-center font-semibold text-sm hover:opacity-80"
          style={{ color: '#333447' }}
        >
          <ArrowLeft size={16} className="mr-1 sm:w-5 sm:h-5" />
          Voltar
        </button>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold flex gap-2 items-center" style={{ color: '#333447' }}>
            <Music size={24} className="sm:w-8 sm:h-8" style={{ color: '#7F8CAA' }} />
            Repertórios
          </h1>
          <Link
            to="/repertorios/novo"
            className="rounded-full text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg shadow-lg transition-all flex items-center gap-2 hover:opacity-80 w-full sm:w-auto justify-center"
            style={{ backgroundColor: '#333447' }}
          >
            <Plus size={16} className="sm:w-5 sm:h-5" />
            Novo Repertório
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {repertorios.length ? (
          repertorios.map(repertorio => {
            const isShared = repertorio.id.startsWith('file-');
            return (
              <div key={repertorio.id} className="rounded-xl p-4 sm:p-6 shadow-lg border hover:shadow-xl transition-all"
                   style={{ backgroundColor: 'rgba(234, 239, 239, 0.9)', borderColor: '#B8CFCE' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold truncate" style={{ color: '#333447' }}>{repertorio.nome}</h3>
                      <div title={isShared ? "Repertório compartilhado" : "Repertório local"} className="flex-shrink-0">
                        {isShared ? (
                          <Globe size={14} className="sm:w-4 sm:h-4" style={{ color: '#7F8CAA' }} />
                        ) : (
                          <User size={14} className="sm:w-4 sm:h-4" style={{ color: '#7F8CAA' }} />
                        )}
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: '#7F8CAA' }}>{repertorio.cifras.length} cifras</p>
                    {isShared && (
                      <p className="text-xs mt-1" style={{ color: '#7F8CAA' }}>
                        Compartilhado • Somente leitura
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 ml-2">
                    <button
                      onClick={() => navigate(`/repertorios/${repertorio.id}/tocar`)}
                      className="p-1.5 sm:p-2 text-white rounded-lg hover:opacity-80 transition-all"
                      style={{ backgroundColor: '#7F8CAA' }}
                      title="Tocar repertório"
                    >
                      <Play size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    {!isShared && (
                      <>
                        <button
                          onClick={() => navigate(`/repertorios/${repertorio.id}/editar`)}
                          className="p-1.5 sm:p-2 rounded-lg hover:opacity-80 transition-all"
                          style={{ backgroundColor: '#B8CFCE', color: '#333447' }}
                          title="Editar"
                        >
                          <Edit size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(repertorio.id, repertorio.nome)}
                          className="p-1.5 sm:p-2 text-white rounded-lg hover:opacity-80 transition-all"
                          style={{ backgroundColor: '#333447' }}
                          title="Excluir"
                        >
                          <Trash2 size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm" style={{ color: '#7F8CAA' }}>
                  Criado em {new Date(repertorio.criadoEm).toLocaleDateString('pt-BR')}
                </p>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-base sm:text-lg text-center" style={{ color: '#7F8CAA' }}>
            <div className="bg-white/80 rounded-lg p-6 sm:p-8 border border-gray-200">
              <p className="mb-4">Nenhum repertório encontrado.</p>
              <Link
                to="/repertorios/novo"
                className="inline-flex items-center gap-2 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all hover:opacity-80 text-sm sm:text-base"
                style={{ backgroundColor: '#333447' }}
              >
                <Plus size={16} className="sm:w-5 sm:h-5" />
                Criar Primeiro Repertório
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

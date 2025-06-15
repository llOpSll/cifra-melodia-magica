
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music, Plus, ArrowLeft, Edit, Trash2, Play } from "lucide-react";
import { getRepertorios, deletarRepertorio } from "../utils/storage";
import { toast } from "@/hooks/use-toast";

export default function Repertorios() {
  const [repertorios, setRepertorios] = useState(getRepertorios());
  const navigate = useNavigate();

  useEffect(() => {
    setRepertorios(getRepertorios());
  }, []);

  function handleDelete(id: string, nome: string) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-green-100 py-12 px-2 font-sans">
      <header className="mx-auto max-w-5xl mb-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
        >
          <ArrowLeft size={19} className="mr-1" />
          Voltar
        </button>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-5xl font-bold flex gap-2 items-center text-primary">
            <Music size={32} className="text-blue-600" />
            Repertórios
          </h1>
          <Link
            to="/repertorios/novo"
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 text-lg shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Novo Repertório
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {repertorios.length ? (
          repertorios.map(repertorio => (
            <div key={repertorio.id} className="bg-white/90 rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{repertorio.nome}</h3>
                  <p className="text-gray-600">{repertorio.cifras.length} cifras</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/repertorios/${repertorio.id}/tocar`)}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                    title="Tocar repertório"
                  >
                    <Play size={16} />
                  </button>
                  <button
                    onClick={() => navigate(`/repertorios/${repertorio.id}/editar`)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
                    title="Editar"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(repertorio.id, repertorio.nome)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Criado em {new Date(repertorio.criadoEm).toLocaleDateString('pt-BR')}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-lg text-gray-500 text-center">
            <p className="mb-4">Nenhum repertório encontrado.</p>
            <Link
              to="/repertorios/novo"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              <Plus size={20} />
              Criar Primeiro Repertório
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { getCifras, salvarRepertorio, atualizarRepertorio, getRepertorioById } from "../utils/storage";
import type { Cifra } from "../utils/storage";

interface Props {
  repertorioId?: string;
}

export function RepertorioForm({ repertorioId }: Props) {
  const navigate = useNavigate();
  const repertorioExistente = repertorioId ? getRepertorioById(repertorioId) : null;
  
  const [nome, setNome] = useState(repertorioExistente?.nome || "");
  const [cifrasSelecionadas, setCifrasSelecionadas] = useState<string[]>(
    repertorioExistente?.cifras || []
  );
  const [cifrasDisponiveis, setCifrasDisponiveis] = useState<Cifra[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    setCifrasDisponiveis(getCifras());
  }, []);

  const cifrasFiltradas = cifrasDisponiveis.filter(
    c =>
      c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      c.artista.toLowerCase().includes(busca.toLowerCase())
  );

  function toggleCifra(cifraId: string) {
    setCifrasSelecionadas(prev => 
      prev.includes(cifraId) 
        ? prev.filter(id => id !== cifraId)
        : [...prev, cifraId]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim()) {
      toast({
        title: "Por favor, insira um nome para o repertório.",
      });
      return;
    }

    try {
      if (repertorioId) {
        // Editar repertório existente
        const sucesso = atualizarRepertorio(repertorioId, { 
          nome: nome.trim(), 
          cifras: cifrasSelecionadas 
        });
        if (sucesso) {
          toast({
            title: "Repertório atualizado com sucesso!",
          });
          navigate("/repertorios");
        } else {
          toast({
            title: "Erro ao atualizar o repertório.",
          });
        }
      } else {
        // Criar novo repertório
        salvarRepertorio(nome.trim(), cifrasSelecionadas);
        toast({
          title: "Repertório criado com sucesso!",
        });
        navigate("/repertorios");
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar o repertório.",
      });
    }
  }

  return (
    <form className="flex flex-col gap-6 text-base" onSubmit={handleSubmit}>
      <div>
        <label className="font-semibold block mb-2" htmlFor="nome">Nome do Repertório *</label>
        <input 
          type="text" 
          name="nome" 
          id="nome"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg"
          value={nome} 
          onChange={e => setNome(e.target.value)}
          placeholder="Ex: Culto Domingo, Ministração, etc"
        />
      </div>

      <div>
        <label className="font-semibold block mb-2">Cifras do Repertório</label>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar cifras..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
          {cifrasFiltradas.length ? (
            cifrasFiltradas.map(cifra => (
              <div 
                key={cifra.id} 
                className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer transition-all ${
                  cifrasSelecionadas.includes(cifra.id) 
                    ? 'bg-blue-100 border-2 border-blue-300' 
                    : 'bg-white border border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => toggleCifra(cifra.id)}
              >
                <input
                  type="checkbox"
                  checked={cifrasSelecionadas.includes(cifra.id)}
                  onChange={() => {}} // Controlado pelo onClick do div
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{cifra.titulo}</div>
                  <div className="text-sm text-gray-600">{cifra.artista} • {cifra.tom}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-8">
              {busca ? 'Nenhuma cifra encontrada.' : 'Nenhuma cifra disponível.'}
            </div>
          )}
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          {cifrasSelecionadas.length} cifras selecionadas
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 font-bold mt-4 transition-all"
      >
        {repertorioId ? 'Atualizar Repertório' : 'Criar Repertório'}
      </button>
    </form>
  );
}

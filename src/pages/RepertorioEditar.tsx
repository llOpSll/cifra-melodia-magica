
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RepertorioForm } from "../components/RepertorioForm";
import { getRepertorioById } from "../utils/storage";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function RepertorioEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const repertorio = getRepertorioById(id || "");

  // Verificar se é repertório editável
  useEffect(() => {
    if (repertorio && repertorio.id.startsWith('file-')) {
      toast({
        title: "Repertório não editável",
        description: "Este repertório é compartilhado e não pode ser editado.",
      });
      navigate("/repertorios");
    }
  }, [repertorio, navigate]);

  if (!repertorio) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Repertório não encontrado.
      </div>
    );
  }

  if (repertorio.id.startsWith('file-')) {
    return null; // Não renderizar se for repertório de arquivo
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-green-100 py-10 px-2 flex items-center justify-center">
      <div className="max-w-2xl w-full rounded-xl bg-white/90 shadow-xl p-10 border border-blue-200">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
        >
          <ArrowLeft size={19} className="mr-1" />
          Voltar
        </button>
        <h1 className="text-2xl font-bold mb-6 text-primary">Editar Repertório</h1>
        <RepertorioForm repertorioId={id} />
      </div>
    </div>
  );
}

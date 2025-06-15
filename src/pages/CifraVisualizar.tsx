
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CifraTransposer } from "../components/CifraTransposer";
import { ArrowLeft, Printer, Edit, Trash2 } from "lucide-react";
import { getCifraBySlug, deletarCifra } from "../utils/storage";
import { toast } from "@/hooks/use-toast";

export default function CifraVisualizar() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [cifra, setCifra] = useState(getCifraBySlug(slug || ""));
  const [fontSize, setFontSize] = useState(20);

  useEffect(() => {
    const cifraPorSlug = getCifraBySlug(slug || "");
    setCifra(cifraPorSlug);
  }, [slug]);

  function handleDelete() {
    if (!cifra) return;
    
    if (confirm(`Tem certeza que deseja excluir a cifra "${cifra.titulo}"?`)) {
      const sucesso = deletarCifra(cifra.id);
      if (sucesso) {
        toast({
          title: "Cifra excluída com sucesso!",
        });
        navigate("/");
      } else {
        toast({
          title: "Erro ao excluir a cifra.",
        });
      }
    }
  }

  if (!cifra) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Cifra não encontrada.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 py-8 px-2 font-sans">
      <div className="mx-auto max-w-4xl bg-white/90 rounded-2xl p-8 shadow-lg border border-green-100">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-green-600 hover:text-green-800 font-semibold text-sm"
        >
          <ArrowLeft size={19} className="mr-1" />
          Voltar
        </button>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="uppercase tracking-wide text-xs text-gray-400 font-semibold mb-2">
              {cifra.instrumento} • Tom <span className="font-bold text-green-700">{cifra.tom}</span>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-1">{cifra.titulo}</h1>
            <div className="text-xl text-green-900 font-semibold">{cifra.artista}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <button
                className="bg-blue-400 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:bg-blue-500 transition-all border shadow"
                onClick={() => window.print()}
              >
                <Printer size={17} />
                Imprimir
              </button>
              <button
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:bg-yellow-500 transition-all border shadow"
                onClick={() => navigate(`/editar/${cifra.id}`)}
              >
                <Edit size={17} />
                Editar
              </button>
              <button
                className="bg-red-400 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:bg-red-500 transition-all border shadow"
                onClick={handleDelete}
              >
                <Trash2 size={17} />
                Excluir
              </button>
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setFontSize(fs => Math.min(fs + 2, 40))}
                className="rounded-full bg-green-300 text-green-900 w-8 h-8 flex items-center justify-center hover:bg-green-400 font-bold text-lg border"
                aria-label="Aumentar fonte"
              >A+</button>
              <button
                onClick={() => setFontSize(fs => Math.max(fs - 2, 10))}
                className="rounded-full bg-green-100 text-green-800 w-8 h-8 flex items-center justify-center hover:bg-green-200 font-bold text-lg border"
                aria-label="Diminuir fonte"
              >A-</button>
            </div>
          </div>
        </div>
        <hr className="my-4" />

        <CifraTransposer
          cifra={cifra.cifra}
          tomOriginal={cifra.tom}
          fontSize={fontSize}
        />

      </div>
    </div>
  );
}


import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CifraTransposer } from "../components/CifraTransposer";
import { ArrowLeft, Music } from "lucide-react";
import { getRepertorioById, getCifraById } from "../utils/storage";
import type { Cifra } from "../utils/storage";

export default function RepertorioTocar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repertorio, setRepertorio] = useState(getRepertorioById(id || ""));
  const [cifras, setCifras] = useState<Cifra[]>([]);
  const [cifraAtual, setCifraAtual] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [transposicoes, setTransposicoes] = useState<{ [key: string]: number }>({});
  const [capostrastes, setCapostrastes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (repertorio) {
      const cifrasCarregadas = repertorio.cifras
        .map(cifraId => getCifraById(cifraId))
        .filter(cifra => cifra !== null) as Cifra[];
      setCifras(cifrasCarregadas);
    }
  }, [repertorio]);

  useEffect(() => {
    const rep = getRepertorioById(id || "");
    setRepertorio(rep);
  }, [id]);

  if (!repertorio) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Repertório não encontrado.
      </div>
    );
  }

  if (cifras.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Este repertório não possui cifras.
      </div>
    );
  }

  const cifraAtualObj = cifras[cifraAtual];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 font-sans">
      {/* Header fixo */}
      <div className="bg-white/95 shadow-lg border-b border-green-200 p-4 sticky top-0 z-10">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-green-600 hover:text-green-800 font-semibold text-sm"
          >
            <ArrowLeft size={19} className="mr-1" />
            Voltar
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-green-800 flex items-center gap-2">
              <Music size={20} />
              {repertorio.nome}
            </h1>
            <p className="text-sm text-gray-600">
              {cifraAtual + 1} de {cifras.length} • {cifraAtualObj.titulo} - {cifraAtualObj.artista}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFontSize(fs => Math.min(fs + 2, 40))}
              className="rounded-full bg-green-300 text-green-900 w-8 h-8 flex items-center justify-center hover:bg-green-400 font-bold text-sm"
              aria-label="Aumentar fonte"
            >A+</button>
            <button
              onClick={() => setFontSize(fs => Math.max(fs - 2, 10))}
              className="rounded-full bg-green-100 text-green-800 w-8 h-8 flex items-center justify-center hover:bg-green-200 font-bold text-sm"
              aria-label="Diminuir fonte"
            >A-</button>
          </div>
        </div>
      </div>

      {/* Conteúdo da cifra */}
      <div className="pb-20"> {/* Padding bottom para não sobrepor as abas */}
        <div className="mx-auto max-w-4xl p-4">
          <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="mb-4">
              <div className="uppercase tracking-wide text-xs text-gray-400 font-semibold mb-2">
                {cifraAtualObj.instrumento} • Tom <span className="font-bold text-green-700">{cifraAtualObj.tom}</span>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-1">{cifraAtualObj.titulo}</h2>
              <div className="text-lg text-green-900 font-semibold">{cifraAtualObj.artista}</div>
            </div>
            
            <CifraTransposer
              cifra={cifraAtualObj.cifra}
              tomOriginal={cifraAtualObj.tom}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>

      {/* Navegação em abas fixas no bottom - otimizada para iPad */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 shadow-lg border-t border-green-200 z-20">
        <div className="overflow-x-auto">
          <div className="flex min-w-max px-2 py-3">
            {cifras.map((cifra, index) => (
              <button
                key={cifra.id}
                onClick={() => setCifraAtual(index)}
                className={`flex-shrink-0 px-4 py-3 mx-1 rounded-lg font-semibold text-sm transition-all ${
                  index === cifraAtual
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{ minWidth: '120px' }} // Garante toque fácil no iPad
              >
                <div className="truncate">{cifra.titulo}</div>
                <div className="text-xs opacity-75 truncate">{cifra.artista}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

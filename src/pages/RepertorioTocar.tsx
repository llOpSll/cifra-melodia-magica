
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CifraTransposer } from "../components/CifraTransposer";
import { ArrowLeft, Music, Play } from "lucide-react";
import { getRepertorioById, getCifraById } from "../utils/storage";
import type { Cifra } from "../utils/storage";

export default function RepertorioTocar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repertorio, setRepertorio] = useState(getRepertorioById(id || ""));
  const [cifras, setCifras] = useState<Cifra[]>([]);
  const [cifraAtual, setCifraAtual] = useState(0);
  const [fontSize, setFontSize] = useState(18);

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
  // Limpar o tom removendo qualquer "0" no final - função mais robusta
  const tomLimpo = cifraAtualObj.tom.replace(/0+$/, '');

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)' }}>
      {/* Header fixo */}
      <div className="shadow-lg border-b p-4 sticky top-0 z-10" 
           style={{ backgroundColor: 'rgba(234, 239, 239, 0.95)', borderColor: '#B8CFCE' }}>
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center font-semibold text-sm hover:opacity-80"
            style={{ color: '#333447' }}
          >
            <ArrowLeft size={19} className="mr-1" />
            Voltar
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: '#333447' }}>
              <Music size={20} />
              {repertorio.nome}
            </h1>
            <p className="text-sm" style={{ color: '#7F8CAA' }}>
              {cifraAtual + 1} de {cifras.length} • {cifraAtualObj.titulo} - {cifraAtualObj.artista}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFontSize(fs => Math.min(fs + 2, 40))}
              className="rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm hover:opacity-80"
              style={{ backgroundColor: '#B8CFCE', color: '#333447' }}
              aria-label="Aumentar fonte"
            >A+</button>
            <button
              onClick={() => setFontSize(fs => Math.max(fs - 2, 10))}
              className="rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm hover:opacity-80"
              style={{ backgroundColor: '#EAEFEF', color: '#333447' }}
              aria-label="Diminuir fonte"
            >A-</button>
          </div>
        </div>
      </div>

      {/* Conteúdo da cifra */}
      <div className="pb-20"> {/* Padding bottom para não sobrepor as abas */}
        <div className="mx-auto max-w-4xl p-4">
          <div className="rounded-2xl p-6 shadow-lg border" 
               style={{ backgroundColor: 'rgba(234, 239, 239, 0.9)', borderColor: '#B8CFCE' }}>
            <div className="mb-4">
              <div className="uppercase tracking-wide text-xs font-semibold mb-2" style={{ color: '#7F8CAA' }}>
                {cifraAtualObj.instrumento} • Tom <span className="font-bold" style={{ color: '#333447' }}>{tomLimpo}</span>
                {cifraAtualObj.capotraste && cifraAtualObj.capotraste > 0 && (
                  <> • Capotraste <span className="font-bold" style={{ color: '#7F8CAA' }}>{cifraAtualObj.capotraste}ª casa</span></>
                )}
                {cifraAtualObj.bpm && cifraAtualObj.bpm > 0 && (
                  <> • BPM <span className="font-bold" style={{ color: '#7F8CAA' }}>{cifraAtualObj.bpm}</span></>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: '#333447' }}>{cifraAtualObj.titulo}</h2>
              <div className="text-lg font-semibold" style={{ color: '#333447' }}>{cifraAtualObj.artista}</div>
              {cifraAtualObj.videoYoutube && (
                <div className="mt-3">
                  <a 
                    href={cifraAtualObj.videoYoutube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border hover:opacity-80 transition-all"
                    style={{ backgroundColor: '#B8CFCE', color: '#333447', borderColor: '#7F8CAA' }}
                  >
                    <Play size={14} />
                    Ver no YouTube
                  </a>
                </div>
              )}
            </div>
            
            <CifraTransposer
              cifra={cifraAtualObj.cifra}
              tomOriginal={tomLimpo}
              fontSize={fontSize}
              capotrasteInicial={cifraAtualObj.capotraste || 0}
            />
          </div>
        </div>
      </div>

      {/* Navegação em abas fixas no bottom - otimizada para iPad */}
      <div className="fixed bottom-0 left-0 right-0 shadow-lg border-t z-20"
           style={{ backgroundColor: 'rgba(234, 239, 239, 0.95)', borderColor: '#B8CFCE' }}>
        <div className="overflow-x-auto">
          <div className="flex min-w-max px-2 py-3">
            {cifras.map((cifra, index) => (
              <button
                key={cifra.id}
                onClick={() => setCifraAtual(index)}
                className={`flex-shrink-0 px-4 py-3 mx-1 rounded-lg font-semibold text-sm transition-all ${
                  index === cifraAtual
                    ? 'text-white shadow-lg'
                    : 'hover:opacity-80'
                }`}
                style={{ 
                  minWidth: '120px',
                  backgroundColor: index === cifraAtual ? '#333447' : '#B8CFCE',
                  color: index === cifraAtual ? 'white' : '#333447'
                }}
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

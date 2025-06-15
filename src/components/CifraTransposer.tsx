
import { useState } from "react";
import { transporCifra, transporTom, aplicarCapotraste, obterTomComCapo } from "../utils/cifra";
import { ArrowLeft, ArrowRight, Guitar, Hash } from "lucide-react";

type Props = {
  cifra: string;
  tomOriginal: string;
  fontSize: number;
};

export function CifraTransposer({ cifra, tomOriginal, fontSize }: Props) {
  const [transposicao, setTransposicao] = useState(0); // semitons de transposição
  const [capotraste, setCapotraste] = useState(0); // casa do capotraste

  function transpor(dir: number) {
    setTransposicao(prev => (prev + dir + 12) % 12);
  }

  function alterarCapo(dir: number) {
    setCapotraste(prev => Math.max(0, Math.min(prev + dir, 12)));
  }

  // Calcular tom atual considerando capotraste E transposição
  let tomAtual = tomOriginal;
  
  // Primeiro aplica capotraste no tom
  if (capotraste > 0) {
    tomAtual = obterTomComCapo(tomAtual, capotraste);
  }
  
  // Depois aplica transposição no tom
  if (transposicao !== 0) {
    tomAtual = transporTom(tomAtual, transposicao);
  }

  // Aplicar transformações na cifra
  let cifraTrabalhada = cifra;
  
  // Primeiro aplica capotraste na cifra (se houver)
  if (capotraste > 0) {
    cifraTrabalhada = aplicarCapotraste(cifraTrabalhada, capotraste);
  }
  
  // Depois aplica transposição na cifra
  if (transposicao !== 0) {
    cifraTrabalhada = transporCifra(cifraTrabalhada, transposicao);
  }

  // Parsea cifra para destacar acordes
  function renderLinha(l: string, idx: number) {
    return (
      <div key={idx} className="whitespace-pre-wrap leading-snug">
        {l.split(/(\[[^\]]+\])/g).map((part, j) =>
          /^\[[^\]]+\]$/.test(part) ? (
            <span
              key={j}
              className="font-bold text-green-700 bg-green-100/80 rounded px-1 mx-1"
              style={{ fontSize: fontSize * 0.95 + "px" }}
            >
              {part.replace(/[\[\]]/g, "")}
            </span>
          ) : (
            <span key={j} style={{ fontSize: fontSize + "px" }}>{part}</span>
          )
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Controles de Transposição */}
      <div className="flex items-center gap-2 mb-3">
        <Guitar className="text-green-500" size={24} />
        <span className="font-bold text-lg">Tom:</span>
        <button
          className="rounded-full p-2 hover:bg-green-200 transition-all"
          onClick={() => transpor(-1)}
          aria-label="Transpor tom abaixo"
        >
          <ArrowLeft />
        </button>
        <span className="rounded px-3 py-1 bg-green-100 font-bold text-green-800 min-w-[50px] text-center">
          {tomAtual}
        </span>
        <button
          className="rounded-full p-2 hover:bg-green-200 transition-all"
          onClick={() => transpor(1)}
          aria-label="Transpor tom acima"
        >
          <ArrowRight />
        </button>
        {transposicao !== 0 && (
          <button
            className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            onClick={() => setTransposicao(0)}
          >
            Reset
          </button>
        )}
      </div>

      {/* Controles de Capotraste */}
      <div className="flex items-center gap-2 mb-4">
        <Hash className="text-blue-500" size={24} />
        <span className="font-bold text-lg">Capotraste:</span>
        <button
          className="rounded-full p-2 hover:bg-blue-200 transition-all"
          onClick={() => alterarCapo(-1)}
          disabled={capotraste === 0}
          aria-label="Diminuir capotraste"
        >
          <ArrowLeft />
        </button>
        <span className="rounded px-3 py-1 bg-blue-100 font-bold text-blue-800 min-w-[50px] text-center">
          {capotraste === 0 ? "Sem" : `${capotraste}ª`}
        </span>
        <button
          className="rounded-full p-2 hover:bg-blue-200 transition-all"
          onClick={() => alterarCapo(1)}
          disabled={capotraste === 12}
          aria-label="Aumentar capotraste"
        >
          <ArrowRight />
        </button>
        {capotraste !== 0 && (
          <button
            className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            onClick={() => setCapotraste(0)}
          >
            Reset
          </button>
        )}
      </div>

      {/* Cifra */}
      <div
        className="border border-green-200 rounded-xl p-4 bg-white/80 shadow-inner"
        style={{ fontSize: fontSize + "px", fontFamily: "monospace" }}
      >
        {cifraTrabalhada.split("\n").map(renderLinha)}
      </div>
    </div>
  );
}

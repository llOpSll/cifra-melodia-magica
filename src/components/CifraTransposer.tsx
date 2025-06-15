
import { useState } from "react";
import { transporCifra, transporTom, aplicarCapotraste, obterTomComCapo } from "../utils/cifra";
import { ArrowLeft, ArrowRight, Guitar, Hash } from "lucide-react";

type Props = {
  cifra: string;
  tomOriginal: string;
  fontSize: number;
  capotrasteInicial?: number;
};

export function CifraTransposer({ cifra, tomOriginal, fontSize, capotrasteInicial = 0 }: Props) {
  const [transposicao, setTransposicao] = useState(0);
  const [capotraste, setCapotraste] = useState(capotrasteInicial);

  function transpor(dir: number) {
    setTransposicao(prev => (prev + dir + 12) % 12);
  }

  function alterarCapo(dir: number) {
    setCapotraste(prev => Math.max(0, Math.min(prev + dir, 12)));
  }

  // Calcular tom atual considerando capotraste E transposição
  let tomAtual = tomOriginal;
  
  if (capotraste > 0) {
    tomAtual = obterTomComCapo(tomAtual, capotraste);
  }
  
  if (transposicao !== 0) {
    tomAtual = transporTom(tomAtual, transposicao);
  }

  // Aplicar transformações na cifra
  let cifraTrabalhada = cifra;
  
  if (capotraste > 0) {
    cifraTrabalhada = aplicarCapotraste(cifraTrabalhada, capotraste);
  }
  
  if (transposicao !== 0) {
    cifraTrabalhada = transporCifra(cifraTrabalhada, transposicao);
  }

  // Função para detectar se uma linha é tablatura
  function isTabLine(line: string): boolean {
    const trimmed = line.trim();
    const tabStartPattern = /^[EADGBEeadgbe][0-9]*\|/;
    const numberPattern = /\d+/;
    const pipePattern = /\|.*\|/;
    
    return tabStartPattern.test(trimmed) && numberPattern.test(trimmed) && pipePattern.test(trimmed);
  }

  // Parsea cifra para destacar acordes
  function renderLinha(l: string, idx: number) {
    // Se for uma linha de tablatura, destacar apenas os números das casas
    if (isTabLine(l)) {
      return (
        <div key={idx} className="whitespace-pre" style={{ fontFamily: 'Roboto Mono, monospace', fontSize: fontSize + "px" }}>
          <span 
            dangerouslySetInnerHTML={{
              __html: l.replace(/(\d+)/g, '<span style="color: #2563eb; font-weight: 500;">$1</span>')
            }}
          />
        </div>
      );
    }

    // Para outras linhas, destacar acordes entre colchetes e remover os colchetes na exibição
    return (
      <div key={idx} className="whitespace-pre-wrap leading-snug" style={{ fontFamily: 'Roboto Mono, monospace', fontSize: fontSize + "px" }}>
        {l.split(/(\[[A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)*(?:\([0-9#b,/]+\))?(?:\/[A-G][#b]?)?\])/g).map((part, j) => {
          // Se a parte é um acorde entre colchetes, destacar SEM os colchetes
          if (/^\[[A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)*(?:\([0-9#b,/]+\))?(?:\/[A-G][#b]?)?\]$/i.test(part)) {
            // Remove os colchetes para exibição
            const acordeSemColchetes = part.slice(1, -1);
            return (
              <span
                key={j}
                className="font-bold text-green-700 bg-green-100/80 rounded px-1"
              >
                {acordeSemColchetes}
              </span>
            );
          }
          // Senão, renderizar normalmente
          return <span key={j}>{part}</span>;
        })}
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
        {capotraste !== capotrasteInicial && (
          <button
            className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            onClick={() => setCapotraste(capotrasteInicial)}
          >
            Reset
          </button>
        )}
      </div>

      {/* Cifra */}
      <div className="border border-green-200 rounded-xl p-4 bg-white/80 shadow-inner">
        {cifraTrabalhada.split("\n").map(renderLinha)}
      </div>
    </div>
  );
}

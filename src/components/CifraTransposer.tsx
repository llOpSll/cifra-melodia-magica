
import { useState } from "react";
import { transporCifra, transporTom, aplicarCapotraste, obterTomComCapo } from "../utils/cifra";
import { ArrowLeft, ArrowRight, Guitar, Hash } from "lucide-react";

type Props = {
  cifra: string;
  tomOriginal: string;
  fontSize: number;
};

export function CifraTransposer({ cifra, tomOriginal, fontSize }: Props) {
  const [transposicao, setTransposicao] = useState(0);
  const [capotraste, setCapotraste] = useState(0);

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
    const tabPattern = /^[EADGBEeadgbe]\|.*\|/;
    const numberPattern = /\d+/;
    const pipePattern = /\|.*\|/;
    return (tabPattern.test(line) || pipePattern.test(line)) && numberPattern.test(line);
  }

  // Função para detectar se uma linha contém apenas acordes
  function isChordOnlyLine(line: string): boolean {
    const trimmed = line.trim();
    if (!trimmed) return false;
    
    const parts = trimmed.split(/\s+/);
    return parts.every(part => /^[A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)?(?:\([0-9#b]+\))?(?:\/[A-G][#b]?)?$/i.test(part));
  }

  // Parsea cifra para destacar acordes e tablaturas
  function renderLinha(l: string, idx: number) {
    // Se for uma linha de tablatura, renderizar com estilo discreto
    if (isTabLine(l)) {
      return (
        <div key={idx} className="whitespace-pre" style={{ fontFamily: 'Roboto Mono, monospace' }}>
          <span 
            style={{ fontSize: fontSize * 0.9 + "px" }}
            dangerouslySetInnerHTML={{
              __html: l.replace(/(\d+)/g, '<span style="color: #2563eb; font-weight: 600;">$1</span>')
            }}
          />
        </div>
      );
    }

    // Se for uma linha só de acordes, destacar todos
    if (isChordOnlyLine(l)) {
      return (
        <div key={idx} className="whitespace-pre-wrap leading-snug" style={{ fontFamily: 'Roboto Mono, monospace' }}>
          {l.split(/(\s+)/).map((part, j) => {
            if (/^\s+$/.test(part)) {
              return <span key={j}>{part}</span>;
            }
            if (/^[A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)?(?:\([0-9#b]+\))?(?:\/[A-G][#b]?)?$/i.test(part.trim()) && part.trim()) {
              return (
                <span
                  key={j}
                  className="font-bold text-green-700 bg-green-100/80 rounded px-1"
                  style={{ fontSize: fontSize * 0.95 + "px" }}
                >
                  {part}
                </span>
              );
            }
            return <span key={j} style={{ fontSize: fontSize + "px" }}>{part}</span>;
          })}
        </div>
      );
    }

    // Para linhas mistas (acordes + letra), destacar acordes no meio do texto
    return (
      <div key={idx} className="whitespace-pre-wrap leading-snug" style={{ fontFamily: 'Roboto Mono, monospace' }}>
        {l.split(/(\b[A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)?(?:\([0-9#b]+\))?(?:\/[A-G][#b]?)?)\b/i).map((part, j) => {
          // Se a parte é um acorde, destacar
          if (/^[A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)?(?:\([0-9#b]+\))?(?:\/[A-G][#b]?)?$/i.test(part) && part.trim() && 
              !/(do|re|mi|fa|sol|la|si|de|em|no|na|se|te|me|le|ne|pe|ve|ce|ge|he|je|ke|que|como|para|pela|pelo|este|esta|esse|essa|onde|quando|porque|antes|depois|sobre|entre|contra|desde|ate|durante|atraves|casa|dia|ano|mes|vez|bem|mal|sim|nao|mas|seu|sua|meu|minha|nosso|nossa|dele|dela|deles|delas)/i.test(part)) {
            return (
              <span
                key={j}
                className="font-bold text-green-700 bg-green-100/80 rounded px-1"
                style={{ fontSize: fontSize * 0.95 + "px" }}
              >
                {part}
              </span>
            );
          }
          // Senão, renderizar normalmente
          return <span key={j} style={{ fontSize: fontSize + "px" }}>{part}</span>;
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
        style={{ fontSize: fontSize + "px" }}
      >
        {cifraTrabalhada.split("\n").map(renderLinha)}
      </div>
    </div>
  );
}

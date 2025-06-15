
import { useState } from "react";
import { transporCifra, transporTom } from "../utils/cifra";
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

  // Limpar o tom original removendo qualquer "0" no final - função mais robusta
  const tomLimpo = tomOriginal.replace(/0+$/, '');

  // Calcular tom atual - só aplicar mudanças se o usuário fez alterações
  let tomAtual = tomLimpo;
  let cifraTrabalhada = cifra;
  
  // Aplicar transposição se o usuário mudou
  if (transposicao !== 0) {
    tomAtual = transporTom(tomAtual, transposicao);
    cifraTrabalhada = transporCifra(cifraTrabalhada, transposicao);
  }
  
  // Aplicar capotraste se o usuário mudou do valor inicial
  if (capotraste !== capotrasteInicial) {
    const diferencaCapo = capotraste - capotrasteInicial;
    tomAtual = transporTom(tomAtual, -diferencaCapo);
    cifraTrabalhada = transporCifra(cifraTrabalhada, -diferencaCapo);
  }

  // Função para detectar se uma linha é tablatura
  function isTabLine(line: string): boolean {
    const trimmed = line.trim();
    const tabStartPattern = /^[EADGBEeadgbe][0-9]*\|/;
    const numberPattern = /\d+/;
    const pipePattern = /\|.*\|/;
    
    return tabStartPattern.test(trimmed) && numberPattern.test(trimmed) && pipePattern.test(trimmed);
  }

  // Função para detectar se uma linha contém apenas acordes (sem letras)
  function isChordOnlyLine(line: string): boolean {
    const trimmed = line.trim();
    // Se a linha tem acordes entre colchetes E não tem texto significativo após remover os acordes
    const hasChords = /\[[A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)*(?:\([0-9#b,/]+\))?(?:\/[A-G][#b]?)?\]/.test(trimmed);
    if (!hasChords) return false;
    
    // Remove todos os acordes e espaços, vê se sobra texto significativo
    const withoutChords = trimmed.replace(/\[[A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)*(?:\([0-9#b,/]+\))?(?:\/[A-G][#b]?)?\]/g, '').replace(/\s+/g, '');
    
    // Se sobrou menos de 3 caracteres, provavelmente é só linha de acordes
    return withoutChords.length < 3;
  }

  // Parsear cifra para destacar acordes
  function renderLinha(l: string, idx: number) {
    // Se for uma linha de tablatura, destacar apenas os números das casas
    if (isTabLine(l)) {
      return (
        <div key={idx} className="whitespace-pre" style={{ fontFamily: 'Roboto Mono, monospace', fontSize: fontSize + "px" }}>
          <span 
            dangerouslySetInnerHTML={{
              __html: l.replace(/(\d+)/g, '<span style="color: #7F8CAA; font-weight: 500;">$1</span>')
            }}
          />
        </div>
      );
    }

    // Para linhas que contêm acordes
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
                className="font-bold rounded px-1"
                style={{ backgroundColor: '#B8CFCE', color: '#333447' }}
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
        <Guitar className="text-blue-600" size={24} style={{ color: '#7F8CAA' }} />
        <span className="font-bold text-lg" style={{ color: '#333447' }}>Tom:</span>
        <button
          className="rounded-full p-2 hover:opacity-80 transition-all"
          style={{ backgroundColor: '#B8CFCE' }}
          onClick={() => transpor(-1)}
          aria-label="Transpor tom abaixo"
        >
          <ArrowLeft />
        </button>
        <span className="rounded px-3 py-1 font-bold min-w-[50px] text-center"
              style={{ backgroundColor: '#EAEFEF', color: '#333447' }}>
          {tomAtual}
        </span>
        <button
          className="rounded-full p-2 hover:opacity-80 transition-all"
          style={{ backgroundColor: '#B8CFCE' }}
          onClick={() => transpor(1)}
          aria-label="Transpor tom acima"
        >
          <ArrowRight />
        </button>
        {transposicao !== 0 && (
          <button
            className="text-xs px-2 py-1 rounded hover:opacity-80"
            style={{ backgroundColor: '#EAEFEF', color: '#333447' }}
            onClick={() => setTransposicao(0)}
          >
            Reset
          </button>
        )}
      </div>

      {/* Controles de Capotraste */}
      <div className="flex items-center gap-2 mb-4">
        <Hash className="text-blue-500" size={24} style={{ color: '#7F8CAA' }} />
        <span className="font-bold text-lg" style={{ color: '#333447' }}>Capotraste:</span>
        <button
          className="rounded-full p-2 hover:opacity-80 transition-all"
          style={{ backgroundColor: '#B8CFCE' }}
          onClick={() => alterarCapo(-1)}
          disabled={capotraste === 0}
          aria-label="Diminuir capotraste"
        >
          <ArrowLeft />
        </button>
        <span className="rounded px-3 py-1 font-bold min-w-[50px] text-center"
              style={{ backgroundColor: '#EAEFEF', color: '#333447' }}>
          {capotraste === 0 ? "Sem" : `${capotraste}ª`}
        </span>
        <button
          className="rounded-full p-2 hover:opacity-80 transition-all"
          style={{ backgroundColor: '#B8CFCE' }}
          onClick={() => alterarCapo(1)}
          disabled={capotraste === 12}
          aria-label="Aumentar capotraste"
        >
          <ArrowRight />
        </button>
        {capotraste !== capotrasteInicial && (
          <button
            className="text-xs px-2 py-1 rounded hover:opacity-80"
            style={{ backgroundColor: '#EAEFEF', color: '#333447' }}
            onClick={() => setCapotraste(capotrasteInicial)}
          >
            Reset
          </button>
        )}
      </div>

      {/* Cifra */}
      <div className="border rounded-xl p-4 shadow-inner"
           style={{ borderColor: '#B8CFCE', backgroundColor: 'rgba(234, 239, 239, 0.8)' }}>
        {cifraTrabalhada.split("\n").map(renderLinha)}
      </div>
    </div>
  );
}

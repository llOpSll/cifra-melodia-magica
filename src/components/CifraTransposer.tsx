
import { useState } from "react";
import { transporCifra } from "../utils/cifra";
import { ArrowLeft, ArrowRight, Guitar } from "lucide-react";

type Props = {
  cifra: string;
  tomOriginal: string;
  fontSize: number;
};

const tons = [
  "C", "C#", "Db",
  "D", "D#", "Eb",
  "E", "F", "F#", "Gb",
  "G", "G#", "Ab",
  "A", "A#", "Bb",
  "B",
];

export function CifraTransposer({ cifra, tomOriginal, fontSize }: Props) {
  const [tom, setTom] = useState(tomOriginal);

  function transpor(dir: number) {
    // (Para MVP, sobe/desce 1 semitom)
    const idx = tons.findIndex(t => t.toUpperCase() === tom.toUpperCase());
    if (idx !== -1) {
      const novoIdx = (idx + dir + tons.length) % tons.length;
      setTom(tons[novoIdx]);
    }
  }

  // Função que aplica a transposição real:
  const cifraTransposta = transporCifra(cifra, tomOriginal, tom);

  // Parsea cifra para destacar acordes/negrito e cor
  function renderLinha(l: string, idx: number) {
    // Regex: [Acorde]letra
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
      <div className="flex items-center gap-2 mb-4">
        <Guitar className="text-green-500" size={24} />
        <span className="font-bold text-lg">Transpor Tom:</span>
        <button
          className="rounded-full p-2 hover:bg-green-200 transition-all"
          onClick={() => transpor(-1)}
          aria-label="Transpor tom abaixo"
        >
          <ArrowLeft />
        </button>
        <span className="rounded px-3 py-1 bg-green-100 font-bold text-green-800">{tom}</span>
        <button
          className="rounded-full p-2 hover:bg-green-200 transition-all"
          onClick={() => transpor(1)}
          aria-label="Transpor tom acima"
        >
          <ArrowRight />
        </button>
      </div>
      <div
        className="border border-green-200 rounded-xl p-4 bg-white/80 shadow-inner"
        style={{ fontSize: fontSize + "px", fontFamily: "monospace" }}
      >
        {cifraTransposta.split("\n").map(renderLinha)}
      </div>
    </div>
  );
}

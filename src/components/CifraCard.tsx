
import { Link } from "react-router-dom";
import { Cifra } from "../utils/storage";

type Props = {
  cifra: Cifra;
};

export function CifraCard({ cifra }: Props) {
  return (
    <Link
      to={`/cifras/${cifra.slug}`}
      className="block bg-white/80 rounded-2xl shadow-md hover:shadow-lg transition-all p-6 min-h-[180px] border border-green-100"
      style={{ textDecoration: "none" }}
    >
      <div className="text-sm mb-1 text-gray-400">{cifra.instrumento} • Tom {cifra.tom}</div>
      <h2 className="font-bold text-xl mb-2 text-primary">{cifra.titulo}</h2>
      <div className="font-semibold text-green-700 text-md mb-1">{cifra.artista}</div>
      <pre className="h-12 overflow-hidden text-xs font-mono text-gray-500 leading-snug">{cifra.cifra.split("\n")[0]}</pre>
    </Link>
  );
}

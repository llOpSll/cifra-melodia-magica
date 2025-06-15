
import { useState, useEffect } from "react";
import { CifraCard } from "../components/CifraCard";
import { Link } from "react-router-dom";
import { Music, List } from "lucide-react";
import { getCifras, inicializarDadosExemplo } from "../utils/storage";

export default function Index() {
  const [busca, setBusca] = useState("");
  const [cifras, setCifras] = useState(getCifras());

  useEffect(() => {
    inicializarDadosExemplo();
    setCifras(getCifras());
  }, []);

  const cifrasFiltradas = cifras.filter(
    c =>
      c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      c.artista.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-100 to-blue-100 py-12 px-2 font-sans">
      <header className="mx-auto max-w-5xl flex items-center justify-between mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold flex gap-2 items-center text-primary">
          <Music size={32} className="text-green-600" />
          CifrasApp
        </h1>
        <div className="flex gap-3">
          <Link
            to="/repertorios"
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 text-lg shadow-lg transition-all flex items-center gap-2"
          >
            <List size={20} />
            Repertórios
          </Link>
          <Link
            to="/nova"
            className="rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 text-lg shadow-lg transition-all"
          >
            + Nova Cifra
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar por artista ou música..."
          className="w-full p-3 rounded-lg border border-gray-300 outline-primary text-lg"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          aria-label="Buscar"
        />
      </div>

      <section className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cifrasFiltradas.length ? (
          cifrasFiltradas.map(cifra => <CifraCard key={cifra.id} cifra={cifra} />)
        ) : (
          <div className="col-span-full text-lg text-gray-500 text-center">
            Nenhuma cifra encontrada.
          </div>
        )}
      </section>
      <footer className="mt-20 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} CifrasApp · Feito com amor 🎸
      </footer>
    </div>
  );
}

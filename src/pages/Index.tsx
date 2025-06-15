
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
    <div className="min-h-screen py-12 px-2 font-sans"
         style={{ background: 'linear-gradient(to bottom right, #EAEFEF, #B8CFCE, #7F8CAA)' }}>
      <header className="mx-auto max-w-5xl flex items-center justify-between mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold flex gap-2 items-center" style={{ color: '#333447' }}>
          <Music size={32} style={{ color: '#7F8CAA' }} />
          CifrasApp
        </h1>
        <div className="flex gap-3">
          <Link
            to="/repertorios"
            className="rounded-full text-white font-semibold px-6 py-3 text-lg shadow-lg transition-all flex items-center gap-2 hover:opacity-80"
            style={{ backgroundColor: '#7F8CAA' }}
          >
            <List size={20} />
            Repertórios
          </Link>
          <Link
            to="/nova"
            className="rounded-full text-white font-semibold px-6 py-3 text-lg shadow-lg transition-all hover:opacity-80"
            style={{ backgroundColor: '#333447' }}
          >
            + Nova Cifra
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar por artista ou música..."
          className="w-full p-3 rounded-lg border text-lg"
          style={{ borderColor: '#B8CFCE', backgroundColor: 'rgba(234, 239, 239, 0.9)', color: '#333447' }}
          value={busca}
          onChange={e => setBusca(e.target.value)}
          aria-label="Buscar"
        />
      </div>

      <section className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cifrasFiltradas.length ? (
          cifrasFiltradas.map(cifra => <CifraCard key={cifra.id} cifra={cifra} />)
        ) : (
          <div className="col-span-full text-lg text-center" style={{ color: '#7F8CAA' }}>
            Nenhuma cifra encontrada.
          </div>
        )}
      </section>
      <footer className="mt-20 text-sm text-center" style={{ color: '#7F8CAA' }}>
        © {new Date().getFullYear()} CifrasApp · Feito com amor 🎸
      </footer>
    </div>
  );
}

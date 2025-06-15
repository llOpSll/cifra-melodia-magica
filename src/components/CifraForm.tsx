
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import slugify from "slugify";

type CifraDados = {
  artista: string;
  titulo: string;
  instrumento: string;
  tom: string;
  cifra: string;
};

const instrumentos = [
  "Violão",
  "Guitarra",
  "Baixo",
  "Ukulele",
  "Teclado",
  "Bateria",
];

export function CifraForm() {
  const [form, setForm] = useState<CifraDados>({
    artista: "",
    titulo: "",
    instrumento: "Violão",
    tom: "",
    cifra: "",
  });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.artista || !form.titulo || !form.tom || !form.cifra) {
      toast({
        title: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    // Aqui deveria salvar no backend ou localStorage. Para demo, redireciona:
    navigate(`/cifras/${slugify(`${form.artista}-${form.titulo}`, {lower: true, strict: true})}`);
  }

  return (
    <form className="flex flex-col gap-4 text-base" onSubmit={handleSubmit}>
      <div>
        <label className="font-semibold block mb-1" htmlFor="artista">Artista/Banda *</label>
        <input type="text" name="artista" id="artista"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={form.artista} onChange={handleChange} />
      </div>
      <div>
        <label className="font-semibold block mb-1" htmlFor="titulo">Título da Música *</label>
        <input type="text" name="titulo" id="titulo"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={form.titulo} onChange={handleChange} />
      </div>
      <div>
        <label className="font-semibold block mb-1" htmlFor="instrumento">Instrumento *</label>
        <select name="instrumento" id="instrumento"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={form.instrumento} onChange={handleChange}>
          {instrumentos.map(i => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="font-semibold block mb-1" htmlFor="tom">Tom original *</label>
        <input type="text" name="tom" id="tom"
          placeholder="Ex: C, D#m, F7M, G/B, etc"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={form.tom} onChange={handleChange} />
      </div>
      <div>
        <label className="font-semibold block mb-1" htmlFor="cifra">Cifra/Tab *</label>
        <textarea name="cifra" id="cifra"
          rows={8}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono"
          value={form.cifra} onChange={handleChange}></textarea>
        <small className="text-gray-400 block mt-1">
          Exemplo:<br />
          [C]Letra da música aqui<br />
        </small>
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 font-bold mt-2 transition-all"
      >
        Salvar Cifra
      </button>
    </form>
  );
}

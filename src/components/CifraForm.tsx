
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import slugify from "slugify";
import { salvarCifra, atualizarCifra, getCifraById } from "../utils/storage";
import { Checkbox } from "@/components/ui/checkbox";

type CifraDados = {
  artista: string;
  titulo: string;
  instrumento: string[];
  tom: string;
  cifra: string;
  capotraste: number;
};

const instrumentos = [
  "Violão",
  "Guitarra",
  "Baixo",
  "Ukulele",
  "Teclado",
  "Bateria",
];

interface Props {
  cifraId?: string;
}

export function CifraForm({ cifraId }: Props) {
  const navigate = useNavigate();
  const cifraExistente = cifraId ? getCifraById(cifraId) : null;
  
  const [form, setForm] = useState<CifraDados>({
    artista: cifraExistente?.artista || "",
    titulo: cifraExistente?.titulo || "",
    instrumento: cifraExistente?.instrumento ? 
      (Array.isArray(cifraExistente.instrumento) ? cifraExistente.instrumento : [cifraExistente.instrumento]) : 
      ["Violão"],
    tom: cifraExistente?.tom || "",
    cifra: cifraExistente?.cifra || "",
    capotraste: cifraExistente?.capotraste || 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e.target.name === 'capotraste' ? parseInt(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  }

  function handleInstrumentoChange(instrumento: string, checked: boolean) {
    if (checked) {
      setForm({ ...form, instrumento: [...form.instrumento, instrumento] });
    } else {
      setForm({ ...form, instrumento: form.instrumento.filter(i => i !== instrumento) });
    }
  }
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.artista || !form.titulo || !form.tom || !form.cifra || form.instrumento.length === 0) {
      toast({
        title: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    try {
      const slug = slugify(`${form.artista}-${form.titulo}`, {lower: true, strict: true});
      
      // Converter array de instrumentos para string para compatibilidade
      const dadosParaSalvar = {
        ...form,
        instrumento: form.instrumento.join(", "),
        slug
      };
      
      if (cifraId) {
        // Editar cifra existente
        const sucesso = atualizarCifra(cifraId, dadosParaSalvar);
        if (sucesso) {
          toast({
            title: "Cifra atualizada com sucesso!",
          });
          navigate(`/cifras/${slug}`);
        } else {
          toast({
            title: "Erro ao atualizar a cifra.",
          });
        }
      } else {
        // Criar nova cifra
        salvarCifra(dadosParaSalvar);
        toast({
          title: "Cifra salva com sucesso!",
        });
        navigate(`/cifras/${slug}`);
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar a cifra.",
      });
    }
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
        <label className="font-semibold block mb-3">Instrumentos *</label>
        <div className="grid grid-cols-2 gap-3">
          {instrumentos.map(instrumento => (
            <div key={instrumento} className="flex items-center space-x-2">
              <Checkbox
                id={instrumento}
                checked={form.instrumento.includes(instrumento)}
                onCheckedChange={(checked) => handleInstrumentoChange(instrumento, checked as boolean)}
              />
              <label htmlFor={instrumento} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {instrumento}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="font-semibold block mb-1" htmlFor="tom">Tom original *</label>
        <input type="text" name="tom" id="tom"
          placeholder="Ex: C, D#m, F7M, G/B, etc"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={form.tom} onChange={handleChange} />
      </div>
      <div>
        <label className="font-semibold block mb-1" htmlFor="capotraste">Capotraste (casa)</label>
        <select name="capotraste" id="capotraste"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={form.capotraste} 
          onChange={(e) => setForm({ ...form, capotraste: parseInt(e.target.value) })}>
          <option value={0}>Sem capotraste</option>
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(casa => (
            <option key={casa} value={casa}>{casa}ª casa</option>
          ))}
        </select>
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
          Use [Acorde] para marcar acordes
        </small>
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 font-bold mt-2 transition-all"
      >
        {cifraId ? 'Atualizar Cifra' : 'Salvar Cifra'}
      </button>
    </form>
  );
}

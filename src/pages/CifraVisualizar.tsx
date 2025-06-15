
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CifraTransposer } from "../components/CifraTransposer";
import { ArrowLeft, Printer } from "lucide-react";

const exemplos = [
  {
    id: 1,
    artista: "Zé Ramalho",
    titulo: "Avohai",
    instrumento: "Violão",
    tom: "Am",
    slug: "ze-ramalho-avohai",
    cifra:
      "[Am]Eu quis evitar teu [F]olhar\nMas não pude reagir\n[F#m7(5-)]A teus olhos de feiticeira\n",
  },
  {
    id: 2,
    artista: "Legião Urbana",
    titulo: "Tempo Perdido",
    instrumento: "Guitarra",
    tom: "G",
    slug: "legiao-urbana-tempo-perdido",
    cifra:
      "[G]Todos os dias [D]quando acordo\n[Em7]Não tenho mais o tempo que passou\n",
  },
  {
    id: 3,
    artista: "Oficina G3",
    titulo: "Te Escolhi",
    instrumento: "Guitarra",
    tom: "Bbm",
    slug: "oficina-g3-te-escolhi",
    cifra: `[Bbm9]         [Ab]
    Você já me procurou
            [Gb]
Por muitas vezes tentou
Como cego na multidão
[Bbm9]             [Ab]
    Que procura seu caminho
       [Gb]                 [Gb]  [F5]  [Db5]  [Bbm]
Mas sozinho nada encontra

E|-------------------------------| 
B|-------------------------------| 
G|-------------------------------| 
D|---4-3-------------------------| 
A|-------4-----------------------| 
E|---------6---------------------| 

[Bbm9]                  [Ab]
    Quantas vezes eu te chamei
     [Gb]             [Gb]  [F5]  [Db5]  [Bbm]
E você não entendeu

E|-------------------------------| 
B|-------------------------------| 
G|-------------------------------| 
D|---4-3-------------------------| 
A|-------4-----------------------| 
E|---------6---------------------| 

[Fm7]                     [Gb]
    Se você parasse um pouco e ouvisse a minha voz

[Db9]           [Ab]
    Te escolhi, te busquei
[Bbm]                [Gb]
    Sempre ao seu lado eu caminhei
[Db9]         [Ab]       [Bbm]  [Gb]
    Eu sofri  por você

[Bbm9]           [Ab]
     Eu te procuro
                   [Gb]
E você por tantos lugares buscou

E|-------------------------------| 
B|--------6/---9/----11/---------| 
G|-------------------------------| 
D|-------------------------------| 
A|-------------------------------| 
E|-------------------------------| 

[Bbm]                 [Ab]                       [Gb]
    Mas nunca entendeu que eu sempre estive perto de você

( [Gb]  [F5]  [Db5]  [Bbm] )

E|-------------------------------| 
B|-------------------------------| 
G|-------------------------------| 
D|---4-3-------------------------| 
A|-------4-----------------------| 
E|---------6---------------------| 

[Bbm]             [Ab]                  [Gb]
    Eu te escolhi, quero te conquistar
                          [F5]  [Db5]  [Bbm]
Te mostrar o verdadeiro amigo

E|-------------------------------| 
B|-------------------------------| 
G|-------------------------------| 
D|---4-3-------------------------| 
A|-------6-----------------------| 
E|---------6---------------------| 

[Fm7]                    [Gb]
    Se você parar e ouvir a minha voz

E|----------------------------------| 
B|--9--6----6-/-4-------------------| 
G|--------6--------6---------6------| 
D|--------------------4-3-4---------| 
A|----------------------------------| 
E|----------------------------------| 

[Db9]           [Ab]
    Te escolhi, te busquei
[Bbm]                [Gb]
    Sempre ao seu lado eu caminhei
[Db9]         [Ab]       [Bb]
    Eu sofri  por você

[Db9]           [Ab]
    Te escolhi, te busquei
[Bbm]                [Gb]
    Sempre ao seu lado eu caminhei
[Db9]         [Ab]       [Bb]
    Eu sofri  por você

( [Db9]  [Ab]  [Bbm]  [Gb] )
( [Db9]  [Ab]  [Bbm]  [Gb] )
( [Db9]  [Ab]  [Bbm]  [Gb] )

[Db9]           [Ab]
    Te escolhi, te busquei
[Bbm]                [Gb]
    Sempre ao seu lado eu caminhei
[Db9]         [Ab]       [Bbm]  [Gb]
    Eu sofri  por você

[Db9]           [Ab]
    Te escolhi, te busquei
[Bbm]                [Gb]
    Sempre ao seu lado eu caminhei
[Db9]         [Ab]       [Bbm]  [Gb]
    Eu sofri  por você

[Solo]

E|--------------------------------------------------------|
B|-7~6------------------------7/9-7-6---------------------|
G|-----6-----8b10--8^10--6-----------8-6-5--8b10--8^10--6-|
D|-------8-------------------------------------------------|
A|-----------------------4---------------------------------|
E|--------------------------------------------------------|

E|--------------------------------| 
B|9--6---------11-13-14-14b16-14~-| 
G|-----10-11-13-------------------| 
D|--------------------------------| 
A|--------------------------------| 
E|--------------------------------| 

E|--------------------------------------------------------|
B|-13/14-13-----13-----14b16-16b18-14~-----------------11-|
G|---------13-15--13~-------------------------11-13-15----|
D|------------------------------------11-13-15------------|
A|--------------------------------------------------------|
E|--------------------------------------------------------|

E|----------------------| 
B|13-14/17b-------------| 
G|----------------------| 
D|----------------------| 
A|----------------------| 
E|----------------------| 

E|-16p13-----------------------------11h14p11-13/11/9-----|
B|------14-------------------11/13/14-----------------11--|
G|--------13/10------10/11/13-----------------------------|
D|--------------11/13--------------------------------------|
A|--------------------------------------------------------|
E|--------------------------------------------------------|

E|-----------------------------| 
B|-----------------------------| 
G|10--------------10-11-13-10~-| 
D|----13-10-11-13--------------| 
A|-----------------------------| 
E|-----------------------------| 

E|---------10h13p10-------------------16--------------| 
B|-------11--------13b15~~-16b---16b--16b---16-14-16--| 
G|-----10---------------------------------------------| 
D|---12-----------------------------------------------| 
A|-13-------------------------------------------------| 
E|----------------------------------------------------| 

E|----------------------------------16-18-20b21~~~--| 
B|--------------------------16-18-19----------------| 
G|-----------------15-16-18-------------------------| 
D|---------15-16-18---------------------------------| 
A|--------------------------------------------------| 
E|--------------------------------------------------| 

E|-20b21-20r~~--16b18--16b18-16-16b18~~-----| 
B|------------------------------------------| 
G|------------------------------------------| 
D|------------------------------------------| 
A|------------------------------------------| 
E|------------------------------------------| 

E|-20b21~--18-16p18h16----16-----16-------------14-14-14-14-13-11---|
B|---------------------19----18--16b---16b------------------------------|
G|-------------------------------------------------------------------|
D|-------------------------------------------------------------------|
A|-------------------------------------------------------------------|
E|-------------------------------------------------------------------|

E|------------------------------------------------------|
B|-------14-13-11----13-9--------------------------11-13b15-|
G|-----------------------------------------11-13-15---------|
D|---------------------------------11-13-15-----------------|
A|-------------------------11-13-15-------------------------|
E|----------------------------------------------------------|

E|------| 
B|---11-| 
G|------| 
D|------| 
A|------| 
E|------| 

E|--------------------| 
B|-7~-6---------------| 
G|-----6--------------| 
D|-------8----4-3-3---| 
A|----------------1---| 
E|----------------1---|`
  },
];

// (No futuro, buscar dados do backend ao invés do array exemplos)
export default function CifraVisualizar() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cifra = exemplos.find(c => c.slug === slug);
  const [fontSize, setFontSize] = useState(20);

  if (!cifra) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Cifra não encontrada.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 py-8 px-2 font-sans">
      <div className="mx-auto max-w-4xl bg-white/90 rounded-2xl p-8 shadow-lg border border-green-100">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-green-600 hover:text-green-800 font-semibold text-sm"
        >
          <ArrowLeft size={19} className="mr-1" />
          Voltar
        </button>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="uppercase tracking-wide text-xs text-gray-400 font-semibold mb-2">
              {cifra.instrumento} • Tom <span className="font-bold text-green-700">{cifra.tom}</span>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-1">{cifra.titulo}</h1>
            <div className="text-xl text-green-900 font-semibold">{cifra.artista}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              className="bg-blue-400 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:bg-blue-500 transition-all border shadow"
              onClick={() => window.print()}
            >
              <Printer size={17} />
              Imprimir
            </button>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setFontSize(fs => Math.min(fs + 2, 40))}
                className="rounded-full bg-green-300 text-green-900 w-8 h-8 flex items-center justify-center hover:bg-green-400 font-bold text-lg border"
                aria-label="Aumentar fonte"
              >A+</button>
              <button
                onClick={() => setFontSize(fs => Math.max(fs - 2, 10))}
                className="rounded-full bg-green-100 text-green-800 w-8 h-8 flex items-center justify-center hover:bg-green-200 font-bold text-lg border"
                aria-label="Diminuir fonte"
              >A-</button>
            </div>
          </div>
        </div>
        <hr className="my-4" />

        <CifraTransposer
          cifra={cifra.cifra}
          tomOriginal={cifra.tom}
          fontSize={fontSize}
        />

      </div>
    </div>
  );
}

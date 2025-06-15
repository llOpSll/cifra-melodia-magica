
// Sistema de armazenamento local para cifras
export interface Cifra {
  id: string;
  artista: string;
  titulo: string;
  instrumento: string;
  tom: string;
  cifra: string;
  slug: string;
  criadaEm: string;
  atualizadaEm: string;
}

export interface Repertorio {
  id: string;
  nome: string;
  cifras: string[]; // IDs das cifras
  criadoEm: string;
  atualizadoEm: string;
}

const CIFRAS_KEY = 'cifras_app_cifras';
const REPERTORIOS_KEY = 'cifras_app_repertorios';

// Funções para cifras
export function getCifras(): Cifra[] {
  try {
    const data = localStorage.getItem(CIFRAS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getCifraById(id: string): Cifra | null {
  const cifras = getCifras();
  return cifras.find(c => c.id === id) || null;
}

export function getCifraBySlug(slug: string): Cifra | null {
  const cifras = getCifras();
  return cifras.find(c => c.slug === slug) || null;
}

export function salvarCifra(cifra: Omit<Cifra, 'id' | 'criadaEm' | 'atualizadaEm'>): string {
  const cifras = getCifras();
  const agora = new Date().toISOString();
  const novaCifra: Cifra = {
    ...cifra,
    id: generateId(),
    criadaEm: agora,
    atualizadaEm: agora
  };
  
  cifras.push(novaCifra);
  localStorage.setItem(CIFRAS_KEY, JSON.stringify(cifras));
  return novaCifra.id;
}

export function atualizarCifra(id: string, dados: Partial<Omit<Cifra, 'id' | 'criadaEm'>>): boolean {
  const cifras = getCifras();
  const index = cifras.findIndex(c => c.id === id);
  
  if (index === -1) return false;
  
  cifras[index] = {
    ...cifras[index],
    ...dados,
    atualizadaEm: new Date().toISOString()
  };
  
  localStorage.setItem(CIFRAS_KEY, JSON.stringify(cifras));
  return true;
}

export function deletarCifra(id: string): boolean {
  const cifras = getCifras();
  const cifrasFiltradas = cifras.filter(c => c.id !== id);
  
  if (cifras.length === cifrasFiltradas.length) return false;
  
  localStorage.setItem(CIFRAS_KEY, JSON.stringify(cifrasFiltradas));
  
  // Remover das playlists também
  const repertorios = getRepertorios();
  repertorios.forEach(r => {
    if (r.cifras.includes(id)) {
      r.cifras = r.cifras.filter(cId => cId !== id);
      r.atualizadoEm = new Date().toISOString();
    }
  });
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertorios));
  
  return true;
}

// Funções para repertórios
export function getRepertorios(): Repertorio[] {
  try {
    const data = localStorage.getItem(REPERTORIOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getRepertorioById(id: string): Repertorio | null {
  const repertorios = getRepertorios();
  return repertorios.find(r => r.id === id) || null;
}

export function salvarRepertorio(nome: string, cifrasIds: string[] = []): string {
  const repertorios = getRepertorios();
  const agora = new Date().toISOString();
  const novoRepertorio: Repertorio = {
    id: generateId(),
    nome,
    cifras: cifrasIds,
    criadoEm: agora,
    atualizadoEm: agora
  };
  
  repertorios.push(novoRepertorio);
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertorios));
  return novoRepertorio.id;
}

export function atualizarRepertorio(id: string, dados: Partial<Omit<Repertorio, 'id' | 'criadoEm'>>): boolean {
  const repertorios = getRepertorios();
  const index = repertorios.findIndex(r => r.id === id);
  
  if (index === -1) return false;
  
  repertorios[index] = {
    ...repertorios[index],
    ...dados,
    atualizadoEm: new Date().toISOString()
  };
  
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertorios));
  return true;
}

export function deletarRepertorio(id: string): boolean {
  const repertorios = getRepertorios();
  const repertoriosFiltrados = repertorios.filter(r => r.id !== id);
  
  if (repertorios.length === repertoriosFiltrados.length) return false;
  
  localStorage.setItem(REPERTORIOS_KEY, JSON.stringify(repertoriosFiltrados));
  return true;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Inicializar com dados de exemplo se não houver dados
export function inicializarDadosExemplo() {
  const cifras = getCifras();
  if (cifras.length === 0) {
    const agora = new Date().toISOString();
    const exemplosCifras: Cifra[] = [
      {
        id: '1',
        artista: 'Zé Ramalho',
        titulo: 'Avohai',
        instrumento: 'Violão',
        tom: 'Am',
        slug: 'ze-ramalho-avohai',
        cifra: '[Am]Eu quis evitar teu [F]olhar\nMas não pude reagir\n[F#m7(5-)]A teus olhos de feiticeira',
        criadaEm: agora,
        atualizadaEm: agora
      },
      {
        id: '2',
        artista: 'Legião Urbana',
        titulo: 'Tempo Perdido',
        instrumento: 'Guitarra',
        tom: 'G',
        slug: 'legiao-urbana-tempo-perdido',
        cifra: '[G]Todos os dias [D]quando acordo\n[Em7]Não tenho mais o tempo que passou',
        criadaEm: agora,
        atualizadaEm: agora
      },
      {
        id: '3',
        artista: 'Oficina G3',
        titulo: 'Te Escolhi',
        instrumento: 'Guitarra',
        tom: 'Bbm',
        slug: 'oficina-g3-te-escolhi',
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
E|----------------1---|`,
        criadaEm: agora,
        atualizadaEm: agora
      }
    ];
    localStorage.setItem(CIFRAS_KEY, JSON.stringify(exemplosCifras));
  }
}

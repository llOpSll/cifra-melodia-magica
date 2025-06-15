
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
        artista: 'MORADA',
        titulo: 'Só Tu És Santo / Uma Coisa / Deixa Queimar / Quando Ele Vem (Pot-Pourri)',
        instrumento: 'Violão',
        tom: 'C',
        slug: 'morada-so-tu-es-santo-pot-pourri',
        cifra: `Intro: C  F  Am  G

C                        F
Só Tu és santo, só Tu és digno
Am                      G
Só Tu és santo, Senhor

C                        F
E eu me rendo a Ti, Senhor
Am                 G       C
E entrego a Ti o meu coração

( C  F  Am  G )

Am         F               C              G
Uma coisa peço ao Senhor e a buscarei
Am         F               C              G
Que eu possa morar na casa do Senhor
Am        F              C              G
E contemplar a Sua beleza e Seu amor
Am        F              C              G
Por todos os dias da minha vida

F         G              Am
Deixa queimar o fogo santo em mim
F         G              C
Deixa queimar o fogo santo em mim
F         G              Am           F
Deixa queimar o fogo santo em mim
G                C
Deixa queimar

C                               F
Quando Ele vem, algo acontece
G                               C
Corações se enchem de alegria
C                               F
Quando Ele vem, algo acontece
G                               C
Tudo se transforma, tudo muda

C                               F
Quando Ele vem, quando Ele vem
G                               C
Quando Ele vem, quando Ele vem`,
        criadaEm: agora,
        atualizadaEm: agora
      },
      {
        id: '2',
        artista: 'Oficina G3',
        titulo: 'Te Escolhi',
        instrumento: 'Guitarra',
        tom: 'Bbm',
        slug: 'oficina-g3-te-escolhi',
        cifra: `Intro:
E|------------------------|
B|------------------------|
G|------------------------|
D|---4-3------------------|
A|-------4----------------|
E|---------6--------------|

Bbm                     Ab
Você já me procurou
         Gb
Por muitas vezes tentou
Como cego na multidão
Bbm             Ab
Que procura seu caminho
       Gb                    Gb  F  Db  Bbm
Mas sozinho nada encontra

E|-------------------------------|
B|-------------------------------|
G|-------------------------------|
D|---4-3-------------------------|
A|-------4-----------------------|
E|---------6---------------------|

Bbm                  Ab
Quantas vezes eu te chamei
     Gb             Gb  F  Db  Bbm
E você não entendeu

E|-------------------------------|
B|-------------------------------|
G|-------------------------------|
D|---4-3-------------------------|
A|-------4-----------------------|
E|---------6---------------------|

Fm                     Gb
Se você parasse um pouco e ouvisse a minha voz

Db           Ab
Te escolhi, te busquei
Bbm                Gb
Sempre ao seu lado eu caminhei
Db         Ab       Bbm   Gb
Eu sofri  por você

Bbm           Ab
Eu te procuro
                   Gb
E você por tantos lugares buscou

E|-------------------------------|
B|--------6/---9/----11/---------|
G|-------------------------------|
D|-------------------------------|
A|-------------------------------|
E|-------------------------------|

Bbm                 Ab                       Gb
Mas nunca entendeu que eu sempre estive perto de você

( Gb  F  Db  Bbm )

E|-------------------------------|
B|-------------------------------|
G|-------------------------------|
D|---4-3-------------------------|
A|-------4-----------------------|
E|---------6---------------------|

Bbm             Ab                  Gb
Eu te escolhi, quero te conquistar
                          F  Db  Bbm
Te mostrar o verdadeiro amigo

E|-------------------------------|
B|-------------------------------|
G|-------------------------------|
D|---4-3-------------------------|
A|-------6-----------------------|
E|---------6---------------------|

Fm                    Gb
Se você parar e ouvir a minha voz

E|----------------------------------|
B|--9--6----6-/-4-------------------|
G|--------6--------6---------6------|
D|--------------------4-3-4---------|
A|----------------------------------|
E|----------------------------------|

Db           Ab
Te escolhi, te busquei
Bbm                Gb
Sempre ao seu lado eu caminhei
Db         Ab       Bb
Eu sofri  por você

Db           Ab
Te escolhi, te busquei
Bbm                Gb
Sempre ao seu lado eu caminhei
Db         Ab       Bb
Eu sofri  por você

( Db  Ab  Bbm  Gb )
( Db  Ab  Bbm  Gb )
( Db  Ab  Bbm  Gb )

Final:
Db           Ab
Te escolhi, te busquei
Bbm                Gb
Sempre ao seu lado eu caminhei
Db         Ab       Bbm  Gb
Eu sofri  por você

Db           Ab
Te escolhi, te busquei
Bbm                Gb
Sempre ao seu lado eu caminhei
Db         Ab       Bbm  Gb
Eu sofri  por você`,
        criadaEm: agora,
        atualizadaEm: agora
      }
    ];
    localStorage.setItem(CIFRAS_KEY, JSON.stringify(exemplosCifras));
  }
}

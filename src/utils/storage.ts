// Sistema de armazenamento local para cifras
export interface Cifra {
  id: string;
  artista: string;
  titulo: string;
  instrumento: string;
  tom: string;
  cifra: string;
  slug: string;
  capotraste?: number; // Casa do capotraste
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

// Inicializar com dados de exemplo corretos
export function inicializarDadosExemplo() {
  const cifras = getCifras();
  // Limpar todas as cifras existentes e recriar
  localStorage.setItem(CIFRAS_KEY, JSON.stringify([]));
  
  const agora = new Date().toISOString();
  const exemplosCifras: Cifra[] = [
    {
      id: '1',
      artista: 'MORADA',
      titulo: 'Só Tu És Santo / Uma Coisa / Deixa Queimar / Quando Ele Vem (Pot-Pourri)',
      instrumento: 'Violão',
      tom: 'C',
      capotraste: 0,
      slug: 'morada-so-tu-es-santo-pot-pourri',
      cifra: `Intro: [C]  [F]  [Am]  [G]

[C]Só Tu és santo, [F]só Tu és digno
[Am]Só Tu és santo, Se[G]nhor

[C]E eu me rendo a Ti, Se[F]nhor
[Am]E entrego a Ti o [G]meu cora[C]ção

( [C]  [F]  [Am]  [G] )

[Am]Uma coisa [F]peço ao Senhor [C]e a busca[G]rei
[Am]Que eu possa [F]morar na casa [C]do Senhor[G]
[Am]E contemplar a [F]Sua beleza [C]e Seu a[G]mor
[Am]Por todos os [F]dias da minha [C]vi[G]da

[F]Deixa queimar o [G]fogo santo em [Am]mim
[F]Deixa queimar o [G]fogo santo em [C]mim
[F]Deixa queimar o [G]fogo santo em [Am]mim[F]
[G]Deixa que[C]mar

[C]Quando Ele vem, algo aconte[F]ce
[G]Corações se enchem de ale[C]gria
[C]Quando Ele vem, algo aconte[F]ce
[G]Tudo se transforma, tudo [C]muda

[C]Quando Ele vem, quando Ele [F]vem
[G]Quando Ele vem, quando Ele [C]vem`,
      criadaEm: agora,
      atualizadaEm: agora
    },
    {
      id: '2',
      artista: 'Oficina G3',
      titulo: 'Te Escolhi',
      instrumento: 'Guitarra',
      tom: 'Bbm',
      capotraste: 0,
      slug: 'oficina-g3-te-escolhi',
      cifra: `Intro:
E|------------------------|
B|------------------------|
G|------------------------|
D|---4-3------------------|
A|-------4----------------|
E|---------6--------------|

[Bbm]Você já me procu[Ab]rou
Por muitas vezes ten[Gb]tou
Como cego na multidão
[Bbm]Que procura seu cami[Ab]nho
Mas sozinho nada encon[Gb]tra    [Gb]  [F]  [Db]  [Bbm]

E|-------------------------------|
B|-------------------------------|
G|-------------------------------|
D|---4-3-------------------------|
A|-------4-----------------------|
E|---------6---------------------|

[Bbm]Quantas vezes eu te cha[Ab]mei
E você não enten[Gb]deu     [Gb]  [F]  [Db]  [Bbm]

E|-------------------------------|
B|-------------------------------|
G|-------------------------------|
D|---4-3-------------------------|
A|-------4-----------------------|
E|---------6---------------------|

[Fm]Se você parasse um pouco e ou[Gb]visse a minha voz

[Db]Te esco[Ab]lhi, te bus[Bbm]quei
Sempre ao seu lado eu cami[Gb]nhei
[Db]Eu so[Ab]fri por vo[Bbm]cê[Gb]

[Bbm]Eu te procu[Ab]ro
E você por tantos lugares bus[Gb]cou

E|-------------------------------|
B|--------6/---9/----11/---------|
G|-------------------------------|
D|-------------------------------|
A|-------------------------------|
E|-------------------------------|

[Bbm]Mas nunca enten[Ab]deu que eu sempre estive perto de vo[Gb]cê

( [Gb]  [F]  [Db]  [Bbm] )

E|-------------------------------|
B|-------------------------------|
G|-------------------------------|
D|---4-3-------------------------|
A|-------4-----------------------|
E|---------6---------------------|

[Bbm]Eu te escolhi, que[Ab]ro te conquistar
[Gb]Te mostrar o verdadeiro ami[F]go  [Db]  [Bbm]

E|-------------------------------|
B|-------------------------------|
G|-------------------------------|
D|---4-3-------------------------|
A|-------6-----------------------|
E|---------6---------------------|

[Fm]Se você parar e ouvir a mi[Gb]nha voz

E|----------------------------------|
B|--9--6----6-/-4-------------------|
G|--------6--------6---------6------|
D|--------------------4-3-4---------|
A|----------------------------------|
E|----------------------------------|

[Db]Te esco[Ab]lhi, te bus[Bbm]quei
Sempre ao seu lado eu cami[Gb]nhei
[Db]Eu so[Ab]fri por vo[Bb]cê

[Db]Te esco[Ab]lhi, te bus[Bbm]quei
Sempre ao seu lado eu cami[Gb]nhei
[Db]Eu so[Ab]fri por vo[Bb]cê

( [Db]  [Ab]  [Bbm]  [Gb] )
( [Db]  [Ab]  [Bbm]  [Gb] )
( [Db]  [Ab]  [Bbm]  [Gb] )

Final:
[Db]Te esco[Ab]lhi, te bus[Bbm]quei
Sempre ao seu lado eu cami[Gb]nhei
[Db]Eu so[Ab]fri por vo[Bbm]cê  [Gb]

[Db]Te esco[Ab]lhi, te bus[Bbm]quei
Sempre ao seu lado eu cami[Gb]nhei
[Db]Eu so[Ab]fri por vo[Bbm]cê  [Gb]`,
      criadaEm: agora,
      atualizadaEm: agora
    }
  ];
  
  localStorage.setItem(CIFRAS_KEY, JSON.stringify(exemplosCifras));
}


// Sistema de armazenamento simplificado para iPad 2
interface LegacyCifra {
  id: string;
  artista: string;
  titulo: string;
  instrumento: string;
  tom: string;
  cifra: string;
  slug: string;
  capotraste?: number;
}

var cifrasCache: LegacyCifra[] = [];
var cifrasCarregadas = false;

// Cifras de exemplo compatíveis
var cifrasExemplo: LegacyCifra[] = [
  {
    id: 'file-1',
    artista: 'Morada',
    titulo: 'Só Tu És Santo',
    instrumento: 'Violão',
    tom: 'G',
    capotraste: 0,
    slug: 'morada-so-tu-es-santo',
    cifra: `Intro: G  C  Em  D

G                    C
Só Tu és santo, só Tu és digno
Em                 D                G
Só Tu és santo, Senhor meu Deus

G                    C
Só Tu és santo, só Tu és digno
Em                 D                G
Só Tu és santo, Senhor meu Deus

    C              G
E os anjos cantam santo
    Em             D
E os anjos cantam santo
    C              G
E os anjos cantam santo
         D               G
É o Senhor Deus Todo Poderoso

    C              G
E os anjos cantam santo
    Em             D
E os anjos cantam santo
    C              G
E os anjos cantam santo
         D               G
É o Senhor Deus Todo Poderoso`
  },
  {
    id: 'file-2',
    artista: 'Oficina G3',
    titulo: 'Te Escolhi',
    instrumento: 'Violão',
    tom: 'D',
    capotraste: 0,
    slug: 'oficina-g3-te-escolhi',
    cifra: `Intro: D  A  G  D

D                    A
Te escolhi antes da fundação do mundo
G                    D
Te escolhi para ser santo
D                    A
Te escolhi para ser amado
G                    D
Te escolhi para ser meu filho

    G              D
Não foi por obras
    A              G
Para que ninguém se glorie
    G              D
Foi por amor, foi por amor
    A              D
Foi por amor que te escolhi

D                    A
Te escolhi antes da fundação do mundo
G                    D
Te escolhi para ser santo
D                    A
Te escolhi para ser amado
G                    D
Te escolhi para ser meu filho`
  },
  {
    id: 'file-3',
    artista: 'Fernandinho',
    titulo: 'Uma Nova História',
    instrumento: 'Violão',
    tom: 'C',
    capotraste: 0,
    slug: 'fernandinho-uma-nova-historia',
    cifra: `Intro: C  G  Am  F

C                    G
Deus está fazendo uma nova história
Am                   F
Na minha vida, na minha casa
C                    G
Deus está fazendo uma nova história
Am                   F                C
Na minha vida, e ela já começou

C                    G
Deus está fazendo uma nova história
Am                   F
Na minha vida, na minha casa
C                    G
Deus está fazendo uma nova história
Am                   F                C
Na minha vida, e ela já começou

    F              C
Uma nova história
    G              Am
Uma nova história
    F              C
Deus está escrevendo
    G              C
Uma nova história

C                    G
O que passou, passou
Am                   F
O que era velho já ficou para trás
C                    G
Eis que faço novas todas as coisas
Am                   F                C
E elas já começaram a acontecer`
  }
];

export function legacyLoadCifras(): void {
  if (!cifrasCarregadas) {
    cifrasCache = cifrasExemplo.slice(); // Copia o array
    cifrasCarregadas = true;
  }
}

export function legacyGetCifras(): LegacyCifra[] {
  return cifrasCache;
}

export function legacyGetCifraBySlug(slug: string): LegacyCifra | null {
  for (var i = 0; i < cifrasCache.length; i++) {
    if (cifrasCache[i].slug === slug) {
      return cifrasCache[i];
    }
  }
  return null;
}

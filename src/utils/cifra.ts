
const tonsOrdem = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

// Dicionário para enharmônicos (Db = C#)
const enhar = {
  "Db": "C#", "Eb": "D#", "Fb": "E", "E#": "F", "Gb": "F#", "Ab": "G#", "Bb": "A#", "Cb": "B",
  "B#": "C"
};

function normalizaTom(t: string): string {
  const up = t.toUpperCase();
  return enhar[up] || up;
}

function getSemitons(base: string, alvo: string): number {
  base = normalizaTom(base);
  alvo = normalizaTom(alvo);
  const iBase = tonsOrdem.indexOf(base);
  const iAlvo = tonsOrdem.indexOf(alvo);
  if (iBase === -1 || iAlvo === -1) return 0;
  return (iAlvo - iBase + 12) % 12;
}

function transpAcorde(acorde: string, semitons: number): string {
  // Match nota + opcional #/b + resto (acorde extenso com / baixo, etc)
  const match = acorde.match(/^([A-G][#b]?)(.*)/);
  if (!match) return acorde;
  let [_, nota, resto] = match;
  // Transpor nota
  let idx = tonsOrdem.indexOf(normalizaTom(nota));
  if (idx === -1) return acorde;
  let novoIdx = (idx + semitons + 12) % 12;
  let notaNova = tonsOrdem[novoIdx];
  // Transpor baixo se houver: Ex: A/C#
  if (resto && resto.startsWith("/")) {
    let baixo = resto.slice(1);
    let idxBaixo = tonsOrdem.indexOf(normalizaTom(baixo));
    if (idxBaixo > -1) {
      let novoBaixo = tonsOrdem[(idxBaixo + semitons + 12) % 12];
      return notaNova + "/" + novoBaixo;
    }
  }
  return notaNova + resto;
}

// Transpõe todos os acordes da cifra baseada no tom original -> novo tom selecionado
export function transporCifra(cifra: string, tomOriginal: string, tomNovo: string): string {
  if (normalizaTom(tomOriginal) === normalizaTom(tomNovo)) return cifra;
  const dif = getSemitons(tomOriginal, tomNovo);

  // Pega todos os [Acorde] e transpõe:
  return cifra.replace(/\[([^\]]+)\]/g, (full, acorde) => {
    let transposto = transpAcorde(acorde, dif);
    return `[${transposto}]`;
  });
}

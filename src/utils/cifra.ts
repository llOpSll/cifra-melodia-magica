

const tonsOrdem = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

// Dicionário para enharmônicos
const enhar = {
  "Db": "C#", "Eb": "D#", "Fb": "E", "E#": "F", "Gb": "F#", "Ab": "G#", "Bb": "A#", "Cb": "B",
  "B#": "C"
};

function normalizaTom(t: string): string {
  // Extrair apenas a nota fundamental (sem menor/maior ou outras extensões)
  const match = t.match(/^([A-G][#b]?)/);
  if (!match) return t;
  
  const notaBase = match[1];
  const up = notaBase.toUpperCase();
  return enhar[up] || up;
}

function transpAcorde(acorde: string, semitons: number): string {
  // Match nota + opcional #/b + resto (acorde extenso com / baixo, etc)
  const match = acorde.match(/^([A-G][#b]?)(.*)/);
  if (!match) return acorde;
  let [_, nota, resto] = match;
  
  // Transpor nota principal
  let idx = tonsOrdem.indexOf(normalizaTom(nota));
  if (idx === -1) return acorde;
  let novoIdx = (idx + semitons + 12) % 12;
  let notaNova = tonsOrdem[novoIdx];
  
  // Transpor baixo se houver: Ex: A/C#
  if (resto && resto.includes("/")) {
    const partes = resto.split("/");
    const baixoParte = partes[1];
    const baixoMatch = baixoParte.match(/^([A-G][#b]?)/);
    if (baixoMatch) {
      const baixoNota = baixoMatch[1];
      let idxBaixo = tonsOrdem.indexOf(normalizaTom(baixoNota));
      if (idxBaixo > -1) {
        let novoBaixo = tonsOrdem[(idxBaixo + semitons + 12) % 12];
        return notaNova + partes[0] + "/" + novoBaixo + baixoParte.substring(baixoMatch[1].length);
      }
    }
  }
  
  return notaNova + resto;
}

// Transpõe todos os acordes da cifra
export function transporCifra(cifra: string, semitons: number): string {
  if (semitons === 0) return cifra;
  
  // Pega todos os [Acorde] e transpõe:
  return cifra.replace(/\[([^\]]+)\]/g, (full, acorde) => {
    let transposto = transpAcorde(acorde, semitons);
    return `[${transposto}]`;
  });
}

// Função para transpor um tom específico (incluindo acordes menores)
export function transporTom(tom: string, semitons: number): string {
  // Extrair a nota fundamental e o resto (m, 7, etc.)
  const match = tom.match(/^([A-G][#b]?)(.*)/);
  if (!match) return tom;
  
  const [_, notaBase, extensao] = match;
  const idx = tonsOrdem.indexOf(normalizaTom(notaBase));
  if (idx === -1) return tom;
  
  const novoIdx = (idx + semitons + 12) % 12;
  const notaNova = tonsOrdem[novoIdx];
  
  return notaNova + extensao;
}

// Função para capotraste
export function aplicarCapotraste(cifra: string, casaCapo: number): string {
  if (casaCapo === 0) return cifra;
  
  // Capotraste equivale a transpor para baixo
  return transporCifra(cifra, -casaCapo);
}

// Função para obter tom com capotraste
export function obterTomComCapo(tomOriginal: string, casaCapo: number): string {
  if (casaCapo === 0) return tomOriginal;
  return transporTom(tomOriginal, -casaCapo);
}


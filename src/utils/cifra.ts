
const tonsOrdem = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

// Dicionário para enharmônicos
const enhar = {
  "Db": "C#", "Eb": "D#", "Fb": "E", "Gb": "F#", "Ab": "G#", "Bb": "A#", "Cb": "B",
  "B#": "C"
};

function normalizaTom(t: string): string {
  const match = t.match(/^([A-G][#b]?)/);
  if (!match) return t;
  
  const notaBase = match[1];
  const up = notaBase.toUpperCase();
  return enhar[up] || up;
}

function transpAcorde(acorde: string, semitons: number): string {
  // Regex mais robusta para capturar acordes complexos incluindo graus, inversões, etc.
  const match = acorde.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return acorde;
  
  let [_, nota, resto] = match;
  
  // Transpor nota principal
  let idx = tonsOrdem.indexOf(normalizaTom(nota));
  if (idx === -1) return acorde;
  let novoIdx = (idx + semitons + 12) % 12;
  let notaNova = tonsOrdem[novoIdx];
  
  // Processar inversões (baixo após /) - incluindo notas com sustenidos/bemóis
  if (resto && resto.includes("/")) {
    resto = resto.replace(/\/([A-G][#b]?)/g, (match, baixoNota) => {
      let idxBaixo = tonsOrdem.indexOf(normalizaTom(baixoNota));
      if (idxBaixo > -1) {
        let novoBaixo = tonsOrdem[(idxBaixo + semitons + 12) % 12];
        return "/" + novoBaixo;
      }
      return match;
    });
  }
  
  return notaNova + resto;
}

// Função para detectar se uma linha é tablatura - mais precisa
function isTabLine(line: string): boolean {
  const trimmed = line.trim();
  // Verifica se começa com notação de corda (E|, A|, D|, G|, B|, e|, ou e1|, B1|, etc.)
  const tabStartPattern = /^[EADGBEeadgbe][0-9]*\|/;
  // Verifica se contém números (casas)
  const numberPattern = /\d+/;
  // Verifica se tem estrutura de tablatura com pipes
  const pipePattern = /\|.*\|/;
  
  return tabStartPattern.test(trimmed) && numberPattern.test(trimmed) && pipePattern.test(trimmed);
}

// Função melhorada para transpor números em uma linha de tablatura
function transposeTabLine(line: string, semitons: number): string {
  if (semitons === 0) return line;
  
  // NUNCA alterar as letras das cordas (E|, A|, D|, G|, B|, e|)
  // Melhorar a regex para capturar todos os números entre pipes, incluindo sequências
  return line.replace(/(\|[^|]*?)(\d+)/g, (match, antes, numero) => {
    const casa = parseInt(numero);
    if (isNaN(casa)) return match;
    
    const novaCasa = casa + semitons;
    // Garantir que a casa não seja negativa e não ultrapasse 24
    const casaFinal = Math.max(0, Math.min(novaCasa, 24));
    return antes + casaFinal.toString();
  });
}

// Transpõe todos os acordes da cifra usando padrão [Acorde]
export function transporCifra(cifra: string, semitons: number): string {
  if (semitons === 0) return cifra;
  
  const linhas = cifra.split('\n');
  const linhasTranspostas = linhas.map(linha => {
    // Se for uma linha de tablatura, transpor apenas os números (casas)
    if (isTabLine(linha)) {
      return transposeTabLine(linha, semitons);
    }
    
    // Regex para acordes entre colchetes [C], [Am7], [C7M/E], etc.
    return linha.replace(/\[([A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)*(?:\([0-9#b,/]+\))?(?:\/[A-G][#b]?)?)\]/g, (match, acorde) => {
      return '[' + transpAcorde(acorde, semitons) + ']';
    });
  });
  
  return linhasTranspostas.join('\n');
}

// Função para transpor um tom específico
export function transporTom(tom: string, semitons: number): string {
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
  
  return transporCifra(cifra, -casaCapo);
}

// Função para obter tom com capotraste
export function obterTomComCapo(tomOriginal: string, casaCapo: number): string {
  if (casaCapo === 0) return tomOriginal;
  return transporTom(tomOriginal, -casaCapo);
}

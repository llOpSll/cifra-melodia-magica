
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

// Função para detectar se uma linha contém apenas acordes
function isChordOnlyLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  
  const parts = trimmed.split(/\s+/);
  
  return parts.every(part => {
    // Padrão mais abrangente para acordes incluindo todos os tipos possíveis
    return /^[A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)*(?:\([0-9#b,/]+\))?(?:\/[A-G][#b]?)?$/i.test(part);
  });
}

// Função para transpor números em uma linha de tablatura (NÃO as cordas)
function transposeTabLine(line: string, semitons: number): string {
  if (semitons === 0) return line;
  
  // Só transpor os números (casas), não alterar as letras das cordas
  return line.replace(/(\d+)/g, (match, numero) => {
    const casa = parseInt(numero);
    if (isNaN(casa)) return match;
    
    const novaCasa = casa + semitons;
    return Math.max(0, Math.min(novaCasa, 24)).toString();
  });
}

// Lista de palavras comuns em português para evitar transposição
const palavrasComuns = [
  'amém', 'amor', 'bem', 'casa', 'deus', 'dia', 'ele', 'ela', 'em', 'eu', 'me', 'meu', 'minha',
  'no', 'na', 'nos', 'nas', 'do', 'da', 'dos', 'das', 'de', 'se', 'te', 'le', 'ne', 'pe', 've',
  'ce', 'ge', 'he', 'je', 'ke', 'que', 'como', 'para', 'pela', 'pelo', 'este', 'esta', 'esse',
  'essa', 'onde', 'quando', 'porque', 'antes', 'depois', 'sobre', 'entre', 'contra', 'desde',
  'ate', 'até', 'durante', 'atraves', 'através', 'casa', 'ano', 'mes', 'mês', 'vez', 'mal',
  'sim', 'não', 'nao', 'mas', 'seu', 'sua', 'nosso', 'nossa', 'dele', 'dela', 'deles', 'delas'
];

// Transpõe todos os acordes da cifra e tablaturas
export function transporCifra(cifra: string, semitons: number): string {
  if (semitons === 0) return cifra;
  
  const linhas = cifra.split('\n');
  const linhasTranspostas = linhas.map(linha => {
    // Se for uma linha de tablatura, transpor apenas os números (casas)
    if (isTabLine(linha)) {
      return transposeTabLine(linha, semitons);
    }
    
    // Regex mais precisa para acordes - incluindo todos os tipos de extensões e inversões
    return linha.replace(/\b([A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)*(?:\([0-9#b,/]+\))?(?:\/[A-G][#b]?)?)\b/g, (match, acorde) => {
      const matchLower = match.toLowerCase();
      
      // Verificar se é uma palavra comum em português
      if (palavrasComuns.includes(matchLower)) {
        return match;
      }
      
      // Verificar se é realmente um acorde válido
      if (/^[A-G][#b]?(?:m|maj|min|dim|aug|sus[24]?|add[0-9]+|[0-9]+|M)*(?:\([0-9#b,/]+\))?(?:\/[A-G][#b]?)?$/i.test(acorde)) {
        return transpAcorde(acorde, semitons);
      }
      
      return match;
    });
  });
  
  return linhasTranspostas.join('\n');
}

// Função para transpor um tom específico (incluindo acordes menores)
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

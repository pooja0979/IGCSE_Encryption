// 3.4.2 Encryption Algorithms Logic

export const caesarCipher = (text: string, shift: number): string => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    // Handle negative shifts correctly with modulo
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
  });
};

export const railFenceCipher = (text: string, rails: number): { encrypted: string; railsArray: string[][] } => {
  if (rails <= 1) return { encrypted: text, railsArray: [] };
  
  const cleanText = text.replace(/\s/g, '_'); // Replace spaces for visibility
  const fence: string[][] = Array.from({ length: rails }, () => Array(cleanText.length).fill(null));
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < cleanText.length; i++) {
    fence[rail][i] = cleanText[i];
    rail += direction;
    if (rail === rails - 1 || rail === 0) direction *= -1;
  }

  const encrypted = fence.flat().filter(c => c !== null).join('');
  return { encrypted, railsArray: fence };
};

export const vigenereCipher = (text: string, key: string, encrypt: boolean = true): string => {
  if (!key) return text;
  
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (cleanKey.length === 0) return text;

  let keyIndex = 0;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    const shift = cleanKey[keyIndex % cleanKey.length].charCodeAt(0) - 65;
    keyIndex++;
    
    const charCode = char.charCodeAt(0) - base;
    const newCode = encrypt 
      ? (charCode + shift) % 26 
      : (charCode - shift + 26) % 26;
      
    return String.fromCharCode(newCode + base);
  });
};

// Pigpen mapping helper (Logic handled in visual component, this is just for reference or simple mapping)
export const pigpenMap: Record<string, string> = {
  // Logic is visual, but we can map chars to a "shape ID" for the renderer
  // Groups: 1=Grid1 (A-I), 2=Grid1Dot (J-R), 3=X (S-V), 4=XDot (W-Z)
};
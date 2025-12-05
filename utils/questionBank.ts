export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source?: string;
}

export const questionBank: Question[] = [
  {
    question: "Identify the correct definition of encryption.",
    options: [
      "Conversion of ciphertext into plaintext",
      "Conversion of plaintext into ciphertext",
      "Conversion of code into data",
      "Conversion of data into information"
    ],
    correctIndex: 1,
    explanation: "Encryption is the process of encoding information (plaintext) into a format that cannot be read (ciphertext) without a key. Decryption is the reverse.",
    source: "Edexcel IGCSE 4CP0/02 Paper 2"
  },
  {
    question: "Why is the Caesar cipher considered a weak encryption algorithm?",
    options: [
      "It requires a complex mathematical key",
      "It can only encrypt numbers",
      "It has a small key space (25 keys) allowing for easy brute-force attacks",
      "It uses a grid-based system that is easy to memorize"
    ],
    correctIndex: 2,
    explanation: "Since there are only 26 letters in the alphabet, there are only 25 useful shifts. A computer (or human) can check all of them very quickly.",
    source: "Edexcel IGCSE 4CP0/02 Paper 2"
  },
  {
    question: "If you apply a Caesar shift of -6 followed by a shift of +8, what is the equivalent single shift?",
    options: [
      "+2",
      "-2",
      "+14",
      "-14"
    ],
    correctIndex: 0,
    explanation: "Shifts are additive. -6 + 8 = +2. Applying these two shifts sequentially is mathematically identical to a single shift of +2.",
    source: "Edexcel IGCSE 4CP0/02 Paper 2"
  },
  {
    question: "The Vigenère cipher uses a series of which other cipher type based on a keyword?",
    options: [
      "Rail Fence ciphers",
      "Pigpen ciphers",
      "Caesar ciphers",
      "Transposition ciphers"
    ],
    correctIndex: 2,
    explanation: "The Vigenère cipher effectively changes the Caesar shift value for each letter based on the corresponding letter of the keyword.",
    source: "Edexcel IGCSE 4CP0/02 Paper 2"
  },
  {
    question: "In a computer program implementing Caesar cipher, the letter 'Y' (index 24) shifted by +5 results in an error if not handled correctly. What is the correct mathematical operation to ensure it wraps around to 'D'?",
    options: [
      "(Index + Shift) / 26",
      "(Index + Shift) MOD 26",
      "(Index + Shift) - 25",
      "Index + Shift"
    ],
    correctIndex: 1,
    explanation: "The Modulo operator (MOD) calculates the remainder. (24 + 5) = 29. 29 MOD 26 = 3, which corresponds to 'D' (A=0, B=1, C=2, D=3).",
    source: "Edexcel IGCSE Past Paper Concept"
  },
  {
    question: "Which of the following best describes the Pigpen cipher?",
    options: [
      "A substitution cipher replacing letters with symbols based on grid fragments",
      "A transposition cipher shuffling the order of letters",
      "A polyalphabetic cipher using a keyword",
      "A binary encryption method"
    ],
    correctIndex: 0,
    explanation: "Pigpen is a geometric substitution cipher where letters are assigned to positions in grids, and the ciphertext is the shape of the grid lines around the letter.",
    source: "Edexcel IGCSE Syllabus"
  },
  {
    question: "In a Rail Fence cipher, how is the plaintext 'HELLO' arranged with 2 rails?",
    options: [
      "H L O then E L",
      "H E L then L O",
      "L L O then H E",
      "H O L then E L"
    ],
    correctIndex: 0,
    explanation: "Rail 1 takes indices 0, 2, 4 (H, L, O). Rail 2 takes indices 1, 3 (E, L). The ciphertext is read as HLOEL.",
    source: "Edexcel IGCSE Syllabus"
  },
  {
    question: "Using a Caesar cipher with a shift of -4 (or backwards 4), what does 'PIXEL' encrypt to?",
    options: [
      "LET AH",
      "LETAH",
      "TMEEP",
      "QJYFM"
    ],
    correctIndex: 1,
    explanation: "P-4=L, I-4=E, X-4=T, E-4=A, L-4=H. Result: LETAH.",
    source: "Edexcel IGCSE 4CP0/02 Paper 2"
  },
  {
    question: "What is the primary difference between a Caesar cipher and a Vigenère cipher?",
    options: [
      "Caesar is polyalphabetic, Vigenère is monoalphabetic",
      "Caesar uses one key for the whole message; Vigenère uses a keyword to change the shift for each letter",
      "Vigenère is easier to crack than Caesar",
      "Caesar uses numbers, Vigenère uses symbols"
    ],
    correctIndex: 1,
    explanation: "Caesar is a monoalphabetic substitution (same shift everywhere). Vigenère is polyalphabetic (shift changes based on the keyword).",
    source: "IGCSE Computer Science Theory"
  },
  {
    question: "A student writes a program to check passwords. It requires an uppercase letter and a digit. This is an example of:",
    options: [
      "Encryption",
      "Validation",
      "Verification",
      "Translation"
    ],
    correctIndex: 1,
    explanation: "Validation ensures data meets specific criteria (e.g., format, range) before processing. Checking for uppercase and digits is a presence/format check.",
    source: "Edexcel IGCSE 4CP0/02 Paper 2 (Contextual)"
  },
  {
    question: "Which encryption method is often represented by a zig-zag pattern?",
    options: [
      "Pigpen Cipher",
      "Caesar Cipher",
      "Rail Fence Cipher",
      "Vigenère Cipher"
    ],
    correctIndex: 2,
    explanation: "The Rail Fence cipher writes the message in a zig-zag pattern across multiple 'rails' (rows) and then reads off the rows sequentially.",
    source: "Edexcel IGCSE Syllabus"
  }
];
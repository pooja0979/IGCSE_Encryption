import React, { useState } from 'react';
import { caesarCipher } from '../utils/ciphers';
import { RefreshCw, ArrowRight, HelpCircle, CheckCircle, XCircle, Lock, Unlock } from 'lucide-react';

const CaesarTool: React.FC = () => {
  const [input, setInput] = useState('HELLO WORLD');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  // Calculate effective shift: positive for encrypt, negative for decrypt
  const effectiveShift = mode === 'encrypt' ? shift : -shift;
  const output = caesarCipher(input, effectiveShift);

  // Practice State
  const [pShift, setPShift] = useState(Math.floor(Math.random() * 5) + 1);
  const [pQuestion, setPQuestion] = useState('SHIFT');
  const [pUserAns, setPUserAns] = useState('');
  const [pFeedback, setPFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const checkPractice = () => {
      const correct = caesarCipher(pQuestion, pShift);
      if (pUserAns.toUpperCase().trim() === correct) {
          setPFeedback('correct');
      } else {
          setPFeedback('incorrect');
      }
  };

  const newPractice = () => {
      const words = ['IGCSE', 'PYTHON', 'LOGIC', 'BINARY', 'DATA', 'CODE'];
      const nextWord = words[Math.floor(Math.random() * words.length)];
      setPQuestion(nextWord);
      setPShift(Math.floor(Math.random() * 5) + 1);
      setPUserAns('');
      setPFeedback(null);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm transition-all duration-300">
          
          {/* Mode Toggle */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-6">
             <button 
                onClick={() => setMode('encrypt')} 
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${mode === 'encrypt' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'}`}
             >
                <Lock size={16} /> Encrypt
             </button>
             <button 
                onClick={() => setMode('decrypt')} 
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${mode === 'decrypt' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'}`}
             >
                <Unlock size={16} /> Decrypt
             </button>
          </div>

          <label className="block text-sm font-medium text-slate-400 mb-2 transition-colors duration-300">
             {mode === 'encrypt' ? 'Plaintext Input' : 'Ciphertext Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            className={`w-full bg-slate-950 border rounded-lg p-3 text-white outline-none font-mono transition-colors duration-300 focus:ring-2 ${mode === 'encrypt' ? 'border-slate-700 focus:ring-cyan-500' : 'border-purple-900/50 focus:ring-purple-500'}`}
            rows={3}
            placeholder={mode === 'encrypt' ? "ENTER TEXT TO LOCK" : "ENTER TEXT TO UNLOCK"}
          />

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-400">Shift Key (N)</label>
              <span className={`font-mono font-bold transition-colors ${mode === 'encrypt' ? 'text-cyan-400' : 'text-purple-400'}`}>{shift}</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value))}
              className={`w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer ${mode === 'encrypt' ? 'accent-cyan-500' : 'accent-purple-500'}`}
            />
          </div>
        </div>

        {/* Output */}
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm relative overflow-hidden transition-all duration-300">
           <div className={`absolute top-0 right-0 p-4 opacity-10 transition-colors duration-300 ${mode === 'encrypt' ? 'text-cyan-500' : 'text-purple-500'}`}>
              {mode === 'encrypt' ? <Lock size={100} /> : <Unlock size={100} />}
           </div>
          <label className={`block text-sm font-medium mb-2 transition-colors ${mode === 'encrypt' ? 'text-cyan-400' : 'text-purple-400'}`}>
             {mode === 'encrypt' ? 'Ciphertext Result' : 'Plaintext Result'}
          </label>
          <div className={`w-full bg-slate-950 border rounded-lg p-3 font-mono min-h-[88px] break-all transition-colors duration-300 ${mode === 'encrypt' ? 'border-slate-700/50 text-cyan-200' : 'border-purple-900/30 text-purple-200'}`}>
            {output}
          </div>
          
          <div className={`mt-6 p-3 rounded border transition-colors duration-300 ${mode === 'encrypt' ? 'bg-cyan-950/30 border-cyan-900/50' : 'bg-purple-950/30 border-purple-900/50'}`}>
             <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${mode === 'encrypt' ? 'text-cyan-500' : 'text-purple-400'}`}>How it works</h4>
             <p className="text-sm text-slate-300">
               {mode === 'encrypt' ? (
                   <>Each letter is shifted <strong>forward</strong> by <span className="font-mono text-white bg-slate-800 px-1 rounded">{shift}</span> positions.</>
               ) : (
                   <>Each letter is shifted <strong>backward</strong> by <span className="font-mono text-white bg-slate-800 px-1 rounded">{shift}</span> positions to recover the original text.</>
               )}
               <br/>
               <span className="font-mono text-xs text-slate-400 block mt-1">
                  {mode === 'encrypt' 
                    ? `E.g., A + ${shift} → ${String.fromCharCode(((65 - 65 + shift + 26) % 26) + 65)}`
                    : `E.g., ${String.fromCharCode(((65 - 65 + shift) % 26) + 65)} - ${shift} → A`
                  }
               </span>
             </p>
          </div>
        </div>
      </div>

      {/* Visualizer Wheel Strip */}
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-2 min-w-max px-2">
           {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char, i) => {
             // For display: If encrypting, Top=Plain, Bot=Cipher. If decrypting, Top=Cipher, Bot=Plain.
             // We can just calculate the result char based on mode.
             // (i + effectiveShift) handles both directions correctly relative to the 'char'
             // BUT visually, if decrypting, it makes more sense to show input char shifting 'back' to output char.
             // Our effectiveShift logic: (CharIndex + effectiveShift) = ResultIndex.
             // If decrypting: Char is Ciphertext, Result is Plaintext.
             
             const resultChar = String.fromCharCode(((i + effectiveShift + 26) % 26) + 65);
             
             return (
               <div key={char} className="flex flex-col items-center group">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-t-lg border font-mono font-bold transition-colors ${mode === 'encrypt' ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-purple-900/20 border-purple-800 text-purple-300'}`}>
                    {char}
                  </div>
                  <div className="h-6 w-full flex items-center justify-center text-slate-600">
                    <ArrowRight className={`rotate-90 transition-transform ${mode === 'decrypt' ? '-rotate-90 text-purple-500/50' : ''}`} size={14} />
                  </div>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-b-lg border font-mono font-bold shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-colors ${mode === 'encrypt' ? 'bg-cyan-900/40 border-cyan-700/50 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-200'}`}>
                    {resultChar}
                  </div>
               </div>
             )
           })}
        </div>
      </div>

       {/* Practice Zone */}
       <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-l-4 border-emerald-500 pl-3 flex items-center gap-2">
                <HelpCircle size={24} className="text-emerald-500"/>
                Practice Zone
            </h3>
            <div className="bg-slate-900/50 p-8 rounded-xl border border-emerald-900/30">
                <p className="text-slate-300 mb-6 text-lg">
                    Encrypt the word <strong className="text-white font-mono bg-slate-800 px-2 py-1 rounded mx-1">{pQuestion}</strong> using a shift of <strong className="text-cyan-400">{pShift}</strong>.
                </p>

                <div className="max-w-md flex gap-4">
                    <input 
                        type="text" 
                        value={pUserAns}
                        onChange={(e) => setPUserAns(e.target.value.toUpperCase())}
                        placeholder="Type answer..."
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button 
                        onClick={checkPractice}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                    >
                        Check
                    </button>
                    <button 
                        onClick={newPractice}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>

                {pFeedback === 'correct' && (
                    <div className="mt-6 flex items-center gap-2 text-emerald-400 animate-in slide-in-from-bottom-2">
                        <CheckCircle size={20} />
                        <span className="font-bold">Correct! Well done.</span>
                    </div>
                )}
                {pFeedback === 'incorrect' && (
                    <div className="mt-6 flex items-center gap-2 text-red-400 animate-in slide-in-from-bottom-2">
                        <XCircle size={20} />
                        <span className="font-bold">Incorrect. Try using the tool above to help you.</span>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default CaesarTool;
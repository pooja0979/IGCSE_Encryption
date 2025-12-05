import React, { useState } from 'react';
import { vigenereCipher } from '../utils/ciphers';
import { HelpCircle, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const VigenereTool: React.FC = () => {
  const [input, setInput] = useState('ATTACK');
  const [keyword, setKeyword] = useState('LEMON');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const cleanInput = input.toUpperCase().replace(/[^A-Z]/g, '');
  const cleanKey = keyword.toUpperCase().replace(/[^A-Z]/g, '');
  
  const output = vigenereCipher(input, keyword);
  
  // Determine active highlight based on hover or default to null
  const activeIndex = hoverIndex;
  
  let activeP = '';
  let activeK = '';
  let activeC = '';

  if (activeIndex !== null && activeIndex < cleanInput.length && cleanKey.length > 0) {
      activeP = cleanInput[activeIndex];
      activeK = cleanKey[activeIndex % cleanKey.length];
      // Calculate cipher char for this specific index to highlight in grid
      const pIdx = activeP.charCodeAt(0) - 65;
      const kIdx = activeK.charCodeAt(0) - 65;
      activeC = String.fromCharCode(((pIdx + kIdx) % 26) + 65);
  }

  // Practice State
  const [pRow, setPRow] = useState('A');
  const [pCol, setPCol] = useState('B');
  const [pUserAns, setPUserAns] = useState('');
  const [pFeedback, setPFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const checkPractice = () => {
     const rowIdx = pRow.charCodeAt(0) - 65;
     const colIdx = pCol.charCodeAt(0) - 65;
     const correct = String.fromCharCode(((rowIdx + colIdx) % 26) + 65);
     
     if (pUserAns.toUpperCase().trim() === correct) {
         setPFeedback('correct');
     } else {
         setPFeedback('incorrect');
     }
  };

  const newPractice = () => {
     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
     setPRow(chars[Math.floor(Math.random() * 26)]);
     setPCol(chars[Math.floor(Math.random() * 26)]);
     setPUserAns('');
     setPFeedback(null);
  };

  return (
    <div className="space-y-12">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Inputs */}
            <div className="space-y-6">
                 <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Plaintext Message</label>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value.toUpperCase())}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none font-mono tracking-widest"
                    />
                </div>
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                    <label className="block text-sm font-medium text-purple-400 mb-2">Keyword</label>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-purple-200 focus:ring-2 focus:ring-purple-500 outline-none font-mono tracking-widest"
                    />
                </div>
                 <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                     <label className="block text-sm font-medium text-cyan-400 mb-2">Ciphertext Result</label>
                     <div className="p-4 bg-slate-950 border border-cyan-900/30 rounded font-mono text-lg tracking-widest text-cyan-300 break-all">
                         {output}
                     </div>
                </div>
            </div>

            {/* Explanation / Interactive Display */}
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex flex-col">
                <h3 className="text-sm font-bold text-slate-300 mb-4">How to use the Vigenère Square</h3>
                <div className="flex-1 overflow-x-auto">
                    <div className="flex space-x-2 mb-4">
                        {cleanInput.split('').map((char, i) => {
                             const kChar = cleanKey[i % cleanKey.length] || '?';
                             const isActive = i === activeIndex;
                             return (
                                 <button 
                                    key={i}
                                    onMouseEnter={() => setHoverIndex(i)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                    className={`flex flex-col items-center p-2 rounded border transition-all ${isActive ? 'bg-slate-800 border-cyan-500 ring-1 ring-cyan-500' : 'bg-slate-950 border-slate-800 hover:bg-slate-800'}`}
                                 >
                                     <span className="text-xs text-slate-500 mb-1">P</span>
                                     <span className="font-mono font-bold text-white">{char}</span>
                                     <span className="text-xs text-purple-500 my-1">K</span>
                                     <span className="font-mono font-bold text-purple-300">{kChar}</span>
                                 </button>
                             )
                        })}
                    </div>
                    
                    {activeP && activeK ? (
                         <div className="text-sm text-slate-300 bg-slate-800 p-4 rounded-lg border border-slate-700">
                             <p className="flex items-center gap-2 mb-2">
                                1. Find the column for Plaintext <strong className="text-white bg-slate-700 px-2 py-0.5 rounded">{activeP}</strong>
                             </p>
                             <p className="flex items-center gap-2 mb-2">
                                2. Find the row for Keyword <strong className="text-purple-300 bg-purple-900/30 px-2 py-0.5 rounded">{activeK}</strong>
                             </p>
                             <p className="flex items-center gap-2">
                                3. The intersection is <strong className="text-cyan-300 bg-cyan-900/30 px-2 py-0.5 rounded">{activeC}</strong>
                             </p>
                         </div>
                    ) : (
                        <div className="text-sm text-slate-500 italic p-4">
                            Hover over a letter pair above to see the lookup process.
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* The Vigenere Square Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="font-bold text-slate-200">Vigenère Square (Tabula Recta)</h3>
                <div className="text-xs text-slate-500 flex gap-4">
                     <div className="flex items-center gap-1"><div className="w-3 h-3 bg-purple-500/20 border border-purple-500/50"></div> Keyword Row</div>
                     <div className="flex items-center gap-1"><div className="w-3 h-3 bg-white/10 border border-white/30"></div> Plaintext Column</div>
                     <div className="flex items-center gap-1"><div className="w-3 h-3 bg-cyan-500/20 border border-cyan-500/50"></div> Result</div>
                </div>
            </div>
            
            <div className="overflow-auto max-h-[500px] p-4 relative">
                 <div className="inline-block min-w-max">
                     {/* Header Row (Plaintext) */}
                     <div className="flex">
                         <div className="w-8 h-8 flex items-center justify-center font-mono text-slate-600 bg-slate-950 sticky left-0 z-20"></div>
                         {ALPHABET.map(char => (
                             <div 
                                key={`head-${char}`} 
                                className={`w-8 h-8 flex items-center justify-center font-mono text-sm font-bold border-b border-slate-800
                                    ${char === activeP ? 'bg-white text-slate-900 ring-2 ring-white z-10' : 'text-slate-400'}
                                `}
                             >
                                 {char}
                             </div>
                         ))}
                     </div>

                     {/* Rows */}
                     {ALPHABET.map((rowChar, rowIndex) => (
                         <div key={`row-${rowChar}`} className="flex">
                             {/* Header Col (Keyword) */}
                             <div className={`
                                w-8 h-8 flex items-center justify-center font-mono text-sm font-bold border-r border-slate-800 sticky left-0 z-10 bg-slate-900
                                ${rowChar === activeK ? 'bg-purple-600 text-white ring-2 ring-purple-600' : 'text-purple-400'}
                             `}>
                                 {rowChar}
                             </div>
                             
                             {/* Cells */}
                             {ALPHABET.map((colChar, colIndex) => {
                                 // The character at this cell is (row + col) % 26
                                 const cellChar = String.fromCharCode(((rowIndex + colIndex) % 26) + 65);
                                 
                                 let cellClass = "text-slate-600";
                                 let bgClass = "";
                                 
                                 const isRowActive = rowChar === activeK;
                                 const isColActive = colChar === activeP;

                                 if (isRowActive && isColActive) {
                                     bgClass = "bg-cyan-500 text-white font-bold ring-2 ring-cyan-400 z-10";
                                     cellClass = "";
                                 } else if (isRowActive) {
                                     bgClass = "bg-purple-500/10";
                                     cellClass = "text-purple-200";
                                 } else if (isColActive) {
                                     bgClass = "bg-white/5";
                                     cellClass = "text-slate-200";
                                 }

                                 return (
                                     <div 
                                        key={`${rowChar}-${colChar}`} 
                                        className={`w-8 h-8 flex items-center justify-center font-mono text-xs ${cellClass} ${bgClass}`}
                                     >
                                         {cellChar}
                                     </div>
                                 );
                             })}
                         </div>
                     ))}
                 </div>
            </div>
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
                    Find the character at the intersection of <strong className="text-purple-400">Row {pRow}</strong> (Keyword) and <strong className="text-white">Column {pCol}</strong> (Plaintext).
                </p>

                <div className="max-w-md flex gap-4">
                    <input 
                        type="text" 
                        value={pUserAns}
                        onChange={(e) => setPUserAns(e.target.value.toUpperCase())}
                        placeholder="Type answer..."
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        maxLength={1}
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
                        <span className="font-bold">Correct! You found it.</span>
                    </div>
                )}
                {pFeedback === 'incorrect' && (
                    <div className="mt-6 flex items-center gap-2 text-red-400 animate-in slide-in-from-bottom-2">
                        <XCircle size={20} />
                        <span className="font-bold">Incorrect. Use the table above to find where they cross.</span>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default VigenereTool;
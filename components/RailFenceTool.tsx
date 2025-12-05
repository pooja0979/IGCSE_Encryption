import React, { useState } from 'react';
import { railFenceCipher } from '../utils/ciphers';
import { ArrowDownRight, ArrowUpRight, ArrowRight, HelpCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const RailFenceTool: React.FC = () => {
  const [input, setInput] = useState('DEFEND THE CASTLE');
  const [rails, setRails] = useState(3);

  const { encrypted, railsArray } = railFenceCipher(input, rails);

  // Helper to find the original index of a char in the zig-zag for display purposes
  const getCharIndex = (rIndex: number, cIndex: number) => {
      // This is a visual helper to show "1st char, 2nd char" etc.
      return cIndex + 1;
  };

  const railColors = [
    "border-cyan-500/50 bg-cyan-900/20 text-cyan-200",
    "border-purple-500/50 bg-purple-900/20 text-purple-200",
    "border-blue-500/50 bg-blue-900/20 text-blue-200",
    "border-emerald-500/50 bg-emerald-900/20 text-emerald-200",
    "border-amber-500/50 bg-amber-900/20 text-amber-200",
    "border-rose-500/50 bg-rose-900/20 text-rose-200",
  ];

   // Practice State
  const [pRails, setPRails] = useState(2);
  const [pQuestion, setPQuestion] = useState('HELP');
  const [pUserAns, setPUserAns] = useState('');
  const [pFeedback, setPFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const checkPractice = () => {
      const { encrypted: correct } = railFenceCipher(pQuestion, pRails);
      if (pUserAns.toUpperCase().trim().replace(/\s/g, '') === correct.replace(/\s/g, '')) {
          setPFeedback('correct');
      } else {
          setPFeedback('incorrect');
      }
  };

  const newPractice = () => {
      const words = ['DOG', 'CAT', 'FISH', 'BIRD', 'CODE', 'JAVA', 'BYTE'];
      const nextWord = words[Math.floor(Math.random() * words.length)];
      setPQuestion(nextWord);
      setPRails(2); // Keep it simple for practice
      setPUserAns('');
      setPFeedback(null);
  };

  return (
    <div className="space-y-12">
      <div className="space-y-8">
        {/* Input Section */}
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Plaintext Message</label>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value.toUpperCase())}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none font-mono tracking-widest"
                        maxLength={25}
                        placeholder="ENTER TEXT"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                        <span className="text-cyan-400 font-bold">Step 1:</span> Write the message diagonally downwards and upwards on valid rails.
                    </p>
                </div>
                
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-400">Number of Rails (Rows)</label>
                        <span className="text-cyan-400 font-mono font-bold text-xl">{rails}</span>
                    </div>
                    <input
                        type="range"
                        min="2"
                        max="6"
                        value={rails}
                        onChange={(e) => setRails(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
                        <span>2 Rails</span>
                        <span>6 Rails</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Step 1: Zig Zag Visualization */}
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 overflow-x-auto relative">
            <div className="absolute top-0 left-0 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10">
                Step 1: Write in Zig-Zag
            </div>
            
            <div className="pt-8 pb-4 min-w-[600px]">
                <div className="relative bg-slate-950 p-6 rounded-lg border border-slate-800">
                    {/* Background Lines for Rails */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col justify-between p-6">
                        {Array.from({length: rails}).map((_, i) => (
                            <div key={i} className="w-full h-[48px] border-b border-dashed border-slate-800/50 flex items-center">
                                <span className="text-[10px] text-slate-600 font-mono -ml-4">Rail {i+1}</span>
                            </div>
                        ))}
                    </div>

                    {/* The Grid Content */}
                    <div className="relative z-0">
                        {railsArray.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex h-[48px] relative">
                                {row.map((char, charIndex) => (
                                    <div key={charIndex} className="flex-1 flex items-center justify-center relative">
                                        {char && (
                                            <div className="relative group">
                                                {/* The Node */}
                                                <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold font-mono text-lg shadow-lg border-2 z-20 relative bg-slate-900 ${railColors[rowIndex % railColors.length]}`}>
                                                    {char === '_' ? '␣' : char}
                                                </div>
                                                {/* Sequence Badge */}
                                                <div className="absolute -top-2 -right-2 w-5 h-5 bg-slate-700 text-white text-[9px] flex items-center justify-center rounded-full border border-slate-600 z-30">
                                                    {getCharIndex(rowIndex, charIndex)}
                                                </div>
                                            </div>
                                        )}

                                        {/* Visual Connectors (Zig Zag Lines) */}
                                        {/* Down-Right Line */}
                                        {char && rowIndex < rails - 1 && railsArray[rowIndex+1][charIndex+1] && (
                                            <div className="absolute w-[140%] h-0.5 bg-slate-600 top-1/2 left-1/2 rotate-[25deg] origin-left -z-10 opacity-50">
                                                <ArrowDownRight className="absolute right-0 -top-3 text-slate-500" size={12} />
                                            </div>
                                        )}
                                        {/* Up-Right Line */}
                                        {char && rowIndex > 0 && railsArray[rowIndex-1][charIndex+1] && (
                                            <div className="absolute w-[140%] h-0.5 bg-slate-600 bottom-1/2 left-1/2 -rotate-[25deg] origin-left -z-10 opacity-50">
                                                <ArrowUpRight className="absolute right-0 -bottom-3 text-slate-500" size={12} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Step 2: Extraction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded">Step 2</div>
                    <h3 className="text-sm font-bold text-slate-300">Read Row-by-Row</h3>
                </div>
                
                <div className="space-y-3">
                    {railsArray.map((row, idx) => {
                        const railContent = row.filter(c => c !== null).join('');
                        if (!railContent) return null;
                        
                        return (
                            <div key={idx} className="flex items-center gap-4 animate-in slide-in-from-left duration-500" style={{animationDelay: `${idx * 100}ms`}}>
                                <div className="w-16 text-xs text-slate-500 font-mono text-right">Rail {idx + 1}</div>
                                <div className={`flex-1 p-3 rounded border font-mono tracking-widest ${railColors[idx % railColors.length]}`}>
                                    {railContent}
                                </div>
                                <ArrowRight className="text-slate-600" size={16} />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="lg:col-span-1 bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex flex-col justify-center">
                    <div className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Final Ciphertext</div>
                    <div className="p-4 bg-slate-950 border border-cyan-900/30 rounded-lg font-mono text-xl tracking-widest text-cyan-300 break-all text-center shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                        {encrypted}
                    </div>
                    <p className="mt-4 text-xs text-slate-400 text-center leading-relaxed">
                        The final message is formed by joining the text from Rail 1, then Rail 2, and so on.
                    </p>
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
                    Encrypt the word <strong className="text-white font-mono bg-slate-800 px-2 py-1 rounded mx-1">{pQuestion}</strong> using <strong className="text-cyan-400">{pRails} rails</strong>.
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
                        <span className="font-bold">Correct! The zig-zag pattern works.</span>
                    </div>
                )}
                {pFeedback === 'incorrect' && (
                    <div className="mt-6 flex items-center gap-2 text-red-400 animate-in slide-in-from-bottom-2">
                        <XCircle size={20} />
                        <span className="font-bold">Incorrect. Try drawing the {pRails} lines on paper.</span>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default RailFenceTool;
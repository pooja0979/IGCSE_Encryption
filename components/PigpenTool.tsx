import React, { useState } from 'react';
import { RefreshCw, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

// Simplified SVG paths for Pigpen characters
const PigpenChar: React.FC<{ char: string; size?: number }> = ({ char, size = 40 }) => {
  const c = char.toUpperCase();
  const stroke = "stroke-cyan-400";
  const width = 3;
  
  // Path Definitions
  // Grid coordinates based on 100x100 viewBox with 25px padding
  // A | B | C
  // --+---+--
  // D | E | F
  // --+---+--
  // G | H | I

  const paths: Record<string, React.ReactNode> = {
    // Grid 1 (A-I)
    // A (Top Left): Needs Right and Bottom borders
    'A': <polyline points="75,25 75,75 25,75" fill="none" />, 
    // B (Top Mid): Needs Left, Right, Bottom borders
    'B': <polyline points="25,25 25,75 75,75 75,25" fill="none" />, 
    // C (Top Right): Needs Left, Bottom borders
    'C': <polyline points="25,25 25,75 75,75" fill="none" />, 
    // D (Mid Left): Needs Top, Right, Bottom borders
    'D': <polyline points="25,25 75,25 75,75 25,75" fill="none" />, 
    // E (Mid Mid): Needs all 4 borders (Box)
    'E': <rect x="25" y="25" width="50" height="50" fill="none" />, 
    // F (Mid Right): Needs Top, Left, Bottom borders
    'F': <polyline points="75,25 25,25 25,75 75,75" fill="none" />, 
    // G (Bot Left): Needs Top, Right borders
    'G': <polyline points="25,25 75,25 75,75" fill="none" />, 
    // H (Bot Mid): Needs Top, Left, Right borders
    'H': <polyline points="25,75 25,25 75,25 75,75" fill="none" />, 
    // I (Bot Right): Needs Top, Left borders
    'I': <polyline points="75,25 25,25 25,75" fill="none" />, 
    
    // Grid 2 (J-R) - Same shapes as A-I but with Dot
    'J': <g><polyline points="75,25 75,75 25,75" fill="none" /><circle cx="60" cy="60" r="4" fill="currentColor"/></g>,
    'K': <g><polyline points="25,25 25,75 75,75 75,25" fill="none" /><circle cx="50" cy="65" r="4" fill="currentColor"/></g>,
    'L': <g><polyline points="25,25 25,75 75,75" fill="none" /><circle cx="40" cy="60" r="4" fill="currentColor"/></g>,
    'M': <g><polyline points="25,25 75,25 75,75 25,75" fill="none" /><circle cx="60" cy="50" r="4" fill="currentColor"/></g>,
    'N': <g><rect x="25" y="25" width="50" height="50" fill="none" /><circle cx="50" cy="50" r="4" fill="currentColor"/></g>,
    'O': <g><polyline points="75,25 25,25 25,75 75,75" fill="none" /><circle cx="40" cy="50" r="4" fill="currentColor"/></g>,
    'P': <g><polyline points="25,25 75,25 75,75" fill="none" /><circle cx="60" cy="40" r="4" fill="currentColor"/></g>,
    'Q': <g><polyline points="25,75 25,25 75,25 75,75" fill="none" /><circle cx="50" cy="35" r="4" fill="currentColor"/></g>,
    'R': <g><polyline points="75,25 25,25 25,75" fill="none" /><circle cx="40" cy="40" r="4" fill="currentColor"/></g>,

    // X Grid 1 (S-V)
    // S (Top): V shape
    'S': <polyline points="25,25 50,50 75,25" fill="none" />, 
    // T (Right): < shape
    'T': <polyline points="75,25 50,50 75,75" fill="none" />, 
    // U (Bottom): ^ shape
    'U': <polyline points="25,75 50,50 75,75" fill="none" />, 
    // V (Left): > shape
    'V': <polyline points="25,75 50,50 25,25" fill="none" />, 
    
    // X Grid 2 (W-Z) - With dot
    'W': <g><polyline points="25,25 50,50 75,25" fill="none" /><circle cx="50" cy="35" r="4" fill="currentColor"/></g>,
    'X': <g><polyline points="75,25 50,50 75,75" fill="none" /><circle cx="65" cy="50" r="4" fill="currentColor"/></g>,
    'Y': <g><polyline points="25,75 50,50 75,75" fill="none" /><circle cx="50" cy="65" r="4" fill="currentColor"/></g>,
    'Z': <g><polyline points="25,75 50,50 25,25" fill="none" /><circle cx="35" cy="50" r="4" fill="currentColor"/></g>,
  };

  if (!/[A-Z]/.test(c)) {
     return <div style={{width: size, height: size}} className="flex items-center justify-center font-mono text-slate-500 text-xl">{char}</div>;
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
        {paths[c]}
    </svg>
  );
};

const PigpenTool: React.FC = () => {
  const [input, setInput] = useState('SECRET');
  
  // Practice State
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceWord, setPracticeWord] = useState('CODE');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const checkAnswer = () => {
      if (practiceInput.toUpperCase().trim() === practiceWord) {
          setFeedback('correct');
      } else {
          setFeedback('incorrect');
      }
  };

  const newQuestion = () => {
      const words = ['IGCSE', 'DATA', 'LOGIC', 'CIPHER', 'BYTE', 'KEY', 'GRID'];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setPracticeWord(randomWord);
      setPracticeInput('');
      setFeedback(null);
  };

  return (
    <div className="space-y-12">
        {/* Interactive Tool */}
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-l-4 border-cyan-500 pl-3">Interactive Tool</h3>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <label className="block text-sm font-medium text-slate-400 mb-2">Plaintext</label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value.toUpperCase())}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none font-mono tracking-widest"
                    placeholder="TYPE HERE"
                />
            </div>

            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800">
                <label className="block text-sm font-medium text-cyan-400 mb-4 text-center">Pigpen Visualization</label>
                <div className="flex flex-wrap gap-4 justify-center min-h-[100px] items-center">
                    {input.split('').map((char, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="bg-slate-950 p-2 rounded border border-slate-800/50 shadow-inner">
                                <PigpenChar char={char} size={60} />
                            </div>
                            <span className="text-xs text-slate-500 font-mono font-bold">{char}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Reference Keys */}
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-l-4 border-purple-500 pl-3">Reference Keys</h3>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                <div className="mb-6">
                    <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">The 4 Grids</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         {/* Grid 1 */}
                        <div className="bg-slate-900/50 p-4 rounded border border-slate-800 text-center">
                            <p className="text-xs text-slate-500 mb-2">Grid 1: A-I</p>
                            <div className="inline-grid grid-cols-3 gap-0 text-slate-300 font-mono text-lg border border-slate-700 bg-slate-950 p-2 rounded">
                                <div className="p-2 border-r border-b border-slate-600">A</div>
                                <div className="p-2 border-r border-b border-slate-600">B</div>
                                <div className="p-2 border-b border-slate-600">C</div>
                                <div className="p-2 border-r border-b border-slate-600">D</div>
                                <div className="p-2 border-r border-b border-slate-600">E</div>
                                <div className="p-2 border-b border-slate-600">F</div>
                                <div className="p-2 border-r border-slate-600">G</div>
                                <div className="p-2 border-r border-slate-600">H</div>
                                <div className="p-2">I</div>
                            </div>
                        </div>
                         {/* Grid 2 */}
                         <div className="bg-slate-900/50 p-4 rounded border border-slate-800 text-center">
                            <p className="text-xs text-slate-500 mb-2">Grid 2: J-R (with dots)</p>
                            <div className="inline-grid grid-cols-3 gap-0 text-slate-300 font-mono text-lg border border-slate-700 bg-slate-950 p-2 rounded">
                                <div className="p-2 border-r border-b border-slate-600 relative">J<span className="absolute bottom-1 right-1 w-1 h-1 bg-slate-500 rounded-full"></span></div>
                                <div className="p-2 border-r border-b border-slate-600 relative">K<span className="absolute bottom-1 right-1 w-1 h-1 bg-slate-500 rounded-full"></span></div>
                                <div className="p-2 border-b border-slate-600 relative">L<span className="absolute bottom-1 right-1 w-1 h-1 bg-slate-500 rounded-full"></span></div>
                                <div className="p-2 border-r border-b border-slate-600 relative">M<span className="absolute bottom-1 right-1 w-1 h-1 bg-slate-500 rounded-full"></span></div>
                                <div className="p-2 border-r border-b border-slate-600 relative">N<span className="absolute bottom-1 right-1 w-1 h-1 bg-slate-500 rounded-full"></span></div>
                                <div className="p-2 border-b border-slate-600 relative">O<span className="absolute bottom-1 right-1 w-1 h-1 bg-slate-500 rounded-full"></span></div>
                                <div className="p-2 border-r border-slate-600 relative">P<span className="absolute bottom-1 right-1 w-1 h-1 bg-slate-500 rounded-full"></span></div>
                                <div className="p-2 border-r border-slate-600 relative">Q<span className="absolute bottom-1 right-1 w-1 h-1 bg-slate-500 rounded-full"></span></div>
                                <div className="p-2 relative">R<span className="absolute bottom-1 right-1 w-1 h-1 bg-slate-500 rounded-full"></span></div>
                            </div>
                        </div>
                        {/* Grid 3 */}
                        <div className="bg-slate-900/50 p-4 rounded border border-slate-800 text-center">
                            <p className="text-xs text-slate-500 mb-2">Grid 3: S-V</p>
                            <div className="inline-block relative w-24 h-24 font-mono text-slate-300 text-lg">
                                <div className="absolute top-1 left-1/2 -translate-x-1/2">S</div>
                                <div className="absolute left-1 top-1/2 -translate-y-1/2">V</div>
                                <div className="absolute right-1 top-1/2 -translate-y-1/2">T</div>
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">U</div>
                                <svg className="absolute inset-0 w-full h-full stroke-slate-600" viewBox="0 0 100 100">
                                    <line x1="20" y1="20" x2="80" y2="80" strokeWidth="2" />
                                    <line x1="80" y1="20" x2="20" y2="80" strokeWidth="2" />
                                </svg>
                            </div>
                        </div>
                         {/* Grid 4 */}
                         <div className="bg-slate-900/50 p-4 rounded border border-slate-800 text-center">
                            <p className="text-xs text-slate-500 mb-2">Grid 4: W-Z (with dots)</p>
                            <div className="inline-block relative w-24 h-24 font-mono text-slate-300 text-lg">
                                <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-1">W<span className="self-end w-1 h-1 bg-slate-500 rounded-full mb-1"></span></div>
                                <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-1">Z<span className="w-1 h-1 bg-slate-500 rounded-full ml-1"></span></div>
                                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-1">X<span className="w-1 h-1 bg-slate-500 rounded-full mr-1"></span></div>
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">Y<span className="w-1 h-1 bg-slate-500 rounded-full mt-1"></span></div>
                                <svg className="absolute inset-0 w-full h-full stroke-slate-600" viewBox="0 0 100 100">
                                    <line x1="20" y1="20" x2="80" y2="80" strokeWidth="2" />
                                    <line x1="80" y1="20" x2="20" y2="80" strokeWidth="2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-6">
                     <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Full A-Z Reference</h4>
                     <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
                        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => (
                            <div key={char} className="flex flex-col items-center bg-slate-900 p-2 rounded border border-slate-800">
                                <span className="text-xs text-slate-500 mb-1">{char}</span>
                                <PigpenChar char={char} size={30} />
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
                <p className="text-slate-300 mb-6">Decode the following Pigpen ciphertext:</p>
                
                <div className="flex flex-wrap gap-4 justify-center mb-8 p-6 bg-slate-950 rounded-lg border border-slate-800">
                    {practiceWord.split('').map((char, i) => (
                         <div key={i} className="p-2">
                             <PigpenChar char={char} size={50} />
                         </div>
                    ))}
                </div>

                <div className="max-w-md mx-auto flex gap-4">
                    <input 
                        type="text" 
                        value={practiceInput}
                        onChange={(e) => setPracticeInput(e.target.value.toUpperCase())}
                        placeholder="Type answer..."
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button 
                        onClick={checkAnswer}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                    >
                        Check
                    </button>
                    <button 
                        onClick={newQuestion}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>

                {feedback === 'correct' && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-emerald-400 animate-in slide-in-from-bottom-2">
                        <CheckCircle size={20} />
                        <span className="font-bold">Correct! Well done.</span>
                    </div>
                )}
                {feedback === 'incorrect' && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-red-400 animate-in slide-in-from-bottom-2">
                        <XCircle size={20} />
                        <span className="font-bold">Incorrect. Try again!</span>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default PigpenTool;
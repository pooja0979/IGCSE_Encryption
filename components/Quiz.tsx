import React, { useState, useEffect } from 'react';
import { generateQuizQuestion } from '../services/gemini';
import { questionBank, Question as QuestionType } from '../utils/questionBank';
import { Brain, CheckCircle, XCircle, Loader2, BookOpen, Sparkles, RefreshCw } from 'lucide-react';

const Quiz: React.FC = () => {
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [useAI, setUseAI] = useState(false);

  const loadQuestion = async () => {
    setLoading(true);
    setRevealed(false);
    setSelected(null);
    setQuestion(null);

    if (!useAI) {
        // Load from local bank
        // Simple random selection for now, could be improved to track history
        await new Promise(resolve => setTimeout(resolve, 500)); // Fake loading for UX
        const randomIndex = Math.floor(Math.random() * questionBank.length);
        setQuestion(questionBank[randomIndex]);
        setLoading(false);
    } else {
        // Load from AI
        const q = await generateQuizQuestion("Encryption methods (Caesar, Pigpen, Vigenère, Rail Fence) or the need for encryption");
        setQuestion(q);
        setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useAI]);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Mode Switcher */}
      <div className="flex justify-center mb-6">
          <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex text-sm font-medium">
              <button 
                onClick={() => setUseAI(false)}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${!useAI ? 'bg-cyan-900/50 text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                  <BookOpen size={16} />
                  Past Papers
              </button>
              <button 
                onClick={() => setUseAI(true)}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${useAI ? 'bg-purple-900/50 text-purple-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                  <Sparkles size={16} />
                  Infinite AI
              </button>
          </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 className={`animate-spin mb-4 ${useAI ? 'text-purple-400' : 'text-cyan-400'}`} size={48} />
            <p className="animate-pulse">{useAI ? 'Generating fresh question...' : 'Retrieving past paper question...'}</p>
        </div>
      ) : !question ? (
        <div className="text-center p-8 bg-slate-900 rounded-xl border border-slate-800">
             <p className="text-red-400 mb-4">Failed to load quiz. Please try again.</p>
             <button onClick={loadQuestion} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-white transition-colors">Retry</button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-4 opacity-5 ${useAI ? 'text-purple-500' : 'text-cyan-500'}`}>
                <Brain size={120} />
            </div>
            
            <div className="relative z-10 mb-2">
                {question.source && (
                    <span className="inline-block px-2 py-1 bg-slate-800 rounded text-[10px] uppercase tracking-wider text-slate-400 border border-slate-700 mb-3">
                        Source: {question.source}
                    </span>
                )}
                <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">{question.question}</h3>
            </div>
            
            <div className="space-y-3 relative z-10">
            {question.options.map((option, idx) => {
                let bgClass = "bg-slate-800 hover:bg-slate-700 border-slate-700";
                let textClass = "text-slate-200";
                
                if (revealed) {
                    if (idx === question.correctIndex) {
                        bgClass = "bg-green-900/30 border-green-500/50";
                        textClass = "text-green-200";
                    } else if (idx === selected) {
                        bgClass = "bg-red-900/30 border-red-500/50";
                        textClass = "text-red-200";
                    } else {
                        bgClass = "bg-slate-800/50 border-slate-700 opacity-50";
                    }
                }
                
                return (
                <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={revealed}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-200 flex items-center justify-between group ${bgClass} ${textClass}`}
                >
                    <span className="font-medium">{option}</span>
                    {revealed && idx === question.correctIndex && <CheckCircle className="text-green-500 flex-shrink-0" size={20}/>}
                    {revealed && idx === selected && idx !== question.correctIndex && <XCircle className="text-red-500 flex-shrink-0" size={20}/>}
                </button>
                );
            })}
            </div>

            {revealed && (
            <div className="mt-6 p-4 bg-slate-950/50 rounded-lg border-l-4 border-cyan-500 animate-in fade-in slide-in-from-bottom-4">
                <h4 className="text-cyan-400 font-bold text-sm mb-2 uppercase tracking-wide">Explanation</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{question.explanation}</p>
                
                <button 
                    onClick={loadQuestion}
                    className={`mt-4 w-full md:w-auto px-6 py-2 rounded font-medium transition-colors flex items-center justify-center gap-2 ${useAI ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}
                >
                    <RefreshCw size={16} />
                    Next Question
                </button>
            </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
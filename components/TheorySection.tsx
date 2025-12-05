import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

const TheorySection: React.FC = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Introduction */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          3.4.1 The Need for Data Encryption
        </h2>
        <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 text-lg leading-relaxed text-slate-300">
          <p className="mb-4">
            In the digital age, we send sensitive information across networks constantly—passwords, bank details, and personal messages. 
          </p>
          <p>
            <strong className="text-white">Encryption</strong> scrambles this data so that if it is intercepted by a hacker (often called a "man-in-the-middle"), it looks like nonsense. Only the person with the correct <strong className="text-cyan-400">key</strong> can decrypt and read it.
          </p>
        </div>
      </section>

      {/* Interactive Scenario */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-950 p-8 rounded-2xl border border-slate-800">
          <div className="text-center space-y-2">
             <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
                <span className="font-bold text-xl">A</span>
             </div>
             <p className="font-bold text-blue-400">Alice</p>
             <p className="text-xs text-slate-500">Sender</p>
          </div>

          <div className="flex flex-col items-center space-y-4">
              <div className="w-full h-1 bg-slate-800 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-slate-400">
                      Internet
                  </div>
              </div>
              
              <div className="flex gap-8">
                 <div className="flex flex-col items-center group cursor-help">
                    <ShieldAlert className="text-red-500 mb-2 group-hover:scale-110 transition-transform" size={32} />
                    <span className="text-xs text-red-400">Without Encryption</span>
                    <span className="text-[10px] bg-red-900/20 text-red-200 px-2 py-1 rounded mt-1">"Password123"</span>
                 </div>
                 <div className="flex flex-col items-center group cursor-help">
                    <ShieldCheck className="text-green-500 mb-2 group-hover:scale-110 transition-transform" size={32} />
                    <span className="text-xs text-green-400">With Encryption</span>
                    <span className="text-[10px] bg-green-900/20 text-green-200 px-2 py-1 rounded mt-1">"Xy9#bK2@!"</span>
                 </div>
              </div>
          </div>

          <div className="text-center space-y-2">
             <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto flex items-center justify-center">
                <span className="font-bold text-xl">B</span>
             </div>
             <p className="font-bold text-purple-400">Bob</p>
             <p className="text-xs text-slate-500">Receiver</p>
          </div>
      </section>
    </div>
  );
};

export default TheorySection;
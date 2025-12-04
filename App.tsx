import React, { useState } from 'react';
import { Lock, Grid3X3, Hash, FileText, Brain, Menu, X, Shield } from 'lucide-react';

import TheorySection from './components/TheorySection';
import CaesarTool from './components/CaesarTool';
import PigpenTool from './components/PigpenTool';
import RailFenceTool from './components/RailFenceTool';
import VigenereTool from './components/VigenereTool';
import Quiz from './components/Quiz';

type View = 'theory' | 'caesar' | 'pigpen' | 'railfence' | 'vigenere' | 'quiz';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('theory');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'theory', label: 'Why Encrypt?', icon: <Shield size={18} /> },
    { id: 'caesar', label: 'Caesar Cipher', icon: <FileText size={18} /> },
    { id: 'pigpen', label: 'Pigpen Cipher', icon: <Grid3X3 size={18} /> },
    { id: 'railfence', label: 'Rail Fence', icon: <Hash size={18} /> },
    { id: 'vigenere', label: 'Vigenère Cipher', icon: <Lock size={18} /> },
    { id: 'quiz', label: 'Test Yourself', icon: <Brain size={18} /> },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'theory': return <TheorySection />;
      case 'caesar': return <CaesarTool />;
      case 'pigpen': return <PigpenTool />;
      case 'railfence': return <RailFenceTool />;
      case 'vigenere': return <VigenereTool />;
      case 'quiz': return <Quiz />;
      default: return <TheorySection />;
    }
  };

  const getTitle = () => {
      const item = navItems.find(i => i.id === currentView);
      return item?.label || 'Encryption';
  };

  const getSubTitle = () => {
      if (currentView === 'theory') return '3.4.1 Understand the need for data encryption';
      if (currentView === 'quiz') return 'Assess your knowledge';
      return '3.4.2 Understand how encryption algorithms work';
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-cyan-400 font-bold tracking-wider">CRYPTOLEARN</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1 hidden md:block">
            CRYPTOLEARN
          </h1>
          <p className="text-xs text-slate-500 font-mono hidden md:block">IGCSE 4CP0 • 3.4</p>
        </div>

        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium
                ${currentView === item.id 
                  ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="bg-slate-800/50 rounded p-3 text-xs text-slate-500 text-center">
                Built for Edexcel IGCSE CS
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
         <header className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{getTitle()}</h2>
            <p className="text-slate-400 font-mono text-sm">{getSubTitle()}</p>
         </header>
         
         <div className="animate-in fade-in duration-500">
            {renderContent()}
         </div>
      </main>
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
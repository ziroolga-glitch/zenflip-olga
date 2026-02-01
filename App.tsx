import React, { useState, useEffect } from 'react';
import Deck from './Deck';
import { CardData } from './types';
import { generateCardContent } from './geminiService';

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await generateCardContent();
        setCards(data);
      } catch (error) {
        console.error("Failed to load cards", error);
      } finally {
        setTimeout(() => setLoading(false), 1200);
      }
    };
    init();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-blue-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-15%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="pt-10 md:pt-16 pb-4 text-center px-6">
          <div className="inline-block px-6 py-2 mb-4 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-black">
            ZIRO OLGA • DIGITAL EXPERIENCE
          </div>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-white mb-2 uppercase">
            Zen<span className="font-black text-blue-500">Flip</span>
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-[12px] md:text-base font-serif italic tracking-wide opacity-70">
            Μια διαλογιστική περιήγηση στην τέχνη της ερώτησης
          </p>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-10">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-b-4 border-indigo-500 rounded-full animate-spin-slow"></div>
              </div>
              <div className="text-blue-500/60 text-[11px] font-black uppercase tracking-[0.6em] animate-pulse">
                Προετοιμασία Τράπουλας...
              </div>
            </div>
          ) : (
            <Deck cards={cards} />
          )}
        </main>

        <footer className="py-10 text-center">
          <div className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] hover:text-slate-600 transition-colors cursor-default">
            &copy; 2026 ZenFlip | Olga Ziro Studio
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;

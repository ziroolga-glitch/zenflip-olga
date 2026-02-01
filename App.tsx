
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
      } catch (err) {
        console.error("Init error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="pt-12 pb-6 text-center z-20">
        <div className="inline-block px-4 py-1 mb-3 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] uppercase tracking-[0.4em] font-bold">
          OLGA ZIRO DIGITAL STUDIO
        </div>
        <h1 className="text-6xl font-light tracking-tighter text-white uppercase">
          Zen<span className="font-black text-blue-500">Flip</span>
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center relative z-10">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-blue-500/50 text-[10px] uppercase tracking-[0.5em]">Φόρτωση</span>
          </div>
        ) : (
          <Deck cards={cards} />
        )}
      </main>

      <footer className="py-8 text-center opacity-20 text-[9px] tracking-[0.3em] uppercase">
        © 2026 ZENFLIP EXPERIENCE
      </footer>
    </div>
  );
};

export default App;


export default App;


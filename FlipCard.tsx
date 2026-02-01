
import React, { useState } from 'react';
import { CardData, CardSide } from './types';
import { generateAIImage } from './geminiService';

interface FlipCardProps {
  card: CardData;
  index: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ card, index }) => {
  const [side, setSide] = useState<CardSide>(CardSide.COVER);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (side === CardSide.COVER) setSide(CardSide.QUESTION);
    else if (side === CardSide.QUESTION) {
      setSide(CardSide.IMAGE);
      if (!imageUrl && !loading) {
        setLoading(true);
        const url = await generateAIImage(card.question);
        setImageUrl(url);
        setLoading(false);
      }
    } else setSide(CardSide.COVER);
  };

  return (
    <div className="perspective w-[320px] h-[520px] md:w-[420px] md:h-[650px] cursor-pointer" onClick={toggle}>
      <div className={`card-inner relative w-full h-full preserve-3d duration-700 
        ${side === CardSide.QUESTION ? 'rotate-y-180' : ''} 
        ${side === CardSide.IMAGE ? 'rotate-x-180' : ''}`}>
        
        {/* SIDE 1: COVER */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-[2.5rem] flex flex-col items-center justify-center p-10 text-slate-900 shadow-2xl">
          <i className="fa-solid fa-eye text-7xl mb-8 text-slate-200"></i>
          <h3 className="text-5xl font-serif italic uppercase tracking-tighter">Βλέμμα</h3>
          <span className="mt-6 text-[10px] opacity-30 tracking-[0.5em] uppercase">Κάρτα {index + 1}</span>
        </div>

        {/* SIDE 2: QUESTION */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center p-10 text-center shadow-2xl border border-white/5">
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-slate-100">
            {card.question}
          </p>
          <div className="mt-12 w-14 h-14 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500">
            <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
          </div>
        </div>

        {/* SIDE 3: IMAGE */}
        <div className="absolute inset-0 backface-hidden rotate-x-180 bg-black rounded-[2.5rem] overflow-hidden shadow-2xl">
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-900">
              <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[10px] text-blue-500 tracking-widest uppercase animate-pulse">Οραματισμός</span>
            </div>
          ) : (
            <>
              <img src={imageUrl || 'https://images.unsplash.com/photo-1549490349-8643362247b5'} className="w-full h-full object-cover opacity-80" alt="AI Art" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
                 <p className="text-white/40 text-[10px] uppercase tracking-widest italic">{card.question}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;



import React, { useState } from 'react';
import { CardData, CardSide } from './types';
import { generateAIImage } from './AiService';

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
    /* ΔΙΟΡΘΩΣΗ: Χρησιμοποιούμε h-[70vh] για να πιάνει το 70% του ύψους της οθόνης και να μην χάνεται */
    <div className="perspective w-[90vw] max-w-[350px] h-[65vh] max-h-[550px] md:w-[420px] md:h-[650px] cursor-pointer mx-auto" onClick={toggle}>
      <div className={`card-inner relative w-full h-full preserve-3d duration-700 
        ${side === CardSide.QUESTION ? 'rotate-y-180' : ''} 
        ${side === CardSide.IMAGE ? 'rotate-x-180' : ''}`}>
        
        {/* SIDE 1: COVER */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-[2rem] flex flex-col items-center justify-center p-6 text-slate-900 shadow-2xl">
          <div className="text-5xl mb-6 text-slate-200">👁️</div>
          <h3 className="text-4xl md:text-5xl font-serif italic uppercase tracking-tighter text-center">Βλέμμα</h3>
          <span className="mt-4 text-[9px] opacity-30 tracking-[0.4em] uppercase">Κάρτα {index + 1}</span>
        </div>

        {/* SIDE 2: QUESTION */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center shadow-2xl border border-white/5">
          <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-slate-100">
            {card.question}
          </p>
          <div className="mt-8 w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500">
            ✨
          </div>
        </div>

        {/* SIDE 3: IMAGE */}
        <div className="absolute inset-0 backface-hidden rotate-x-180 bg-black rounded-[2rem] overflow-hidden shadow-2xl">
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-900">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[9px] text-blue-500 tracking-widest uppercase animate-pulse">Οραματισμός</span>
            </div>
          ) : (
            <>
              <img src={imageUrl || 'https://images.unsplash.com/photo-1549490349-8643362247b5'} className="w-full h-full object-cover opacity-80" alt="AI Art" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-6">
                 <p className="text-white/60 text-[10px] uppercase tracking-widest italic line-clamp-2">{card.question}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

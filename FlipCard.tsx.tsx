

import React, { useState } from 'react';
import { CardData, CardSide } from './types';
import { generateAIImage } from './geminiService';

interface FlipCardProps {
  card: CardData;
  index: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ card, index }) => {
  const [side, setSide] = useState<CardSide>(CardSide.COVER);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNextSide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (side === CardSide.COVER) {
      setSide(CardSide.QUESTION);
    } else if (side === CardSide.QUESTION) {
      triggerImageGeneration();
    } else {
      setSide(CardSide.COVER);
    }
  };

  const resetCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSide(CardSide.COVER);
  };

  const triggerImageGeneration = async () => {
    setSide(CardSide.IMAGE);
    if (!generatedImageUrl && !isGenerating) {
      setIsGenerating(true);
      const url = await generateAIImage(card.question);
      setGeneratedImageUrl(url);
      setIsGenerating(false);
    }
  };

  const handleRotateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleNextSide(e);
  };

  return (
    <div 
      className="perspective w-[320px] xs:w-[350px] md:w-[450px] h-[520px] md:h-[680px] cursor-pointer group"
      onClick={handleNextSide}
    >
      <div className={`card-inner relative w-full h-full preserve-3d transition-transform duration-700
        ${side === CardSide.QUESTION ? 'rotate-y-180' : ''} 
        ${side === CardSide.IMAGE ? 'rotate-x-180' : ''}`}>
        
        <div className="absolute inset-0 backface-hidden rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-[#fdfcfb] flex flex-col">
          <div className="shine"></div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
            <div className="w-full h-72 md:h-80 bg-slate-100 rounded-[2.5rem] flex items-center justify-center border border-black/5 relative overflow-hidden group/eye">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#3b82f6,_transparent)] scale-150 group-hover/eye:scale-110 transition-transform duration-1000"></div>
               <div className="relative z-10 flex flex-col items-center gap-6">
                 <i className="fa-solid fa-eye text-8xl md:text-[10rem] text-slate-300 transition-all duration-700 group-hover/eye:text-blue-500"></i>
                 <div className="w-20 h-2 bg-slate-200 rounded-full group-hover/eye:bg-blue-200 transition-colors"></div>
               </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-slate-900 font-serif italic text-5xl md:text-7xl tracking-tighter mb-4 uppercase">Βλέμμα</h3>
              <div className="flex items-center justify-center gap-6 opacity-30">
                <span className="h-[1px] w-12 bg-slate-900"></span>
                <span className="text-slate-900 text-[10px] uppercase tracking-[0.6em] font-black">Κάρτα {index + 1}</span>
                <span className="h-[1px] w-12 bg-slate-900"></span>
              </div>
            </div>
          </div>
          
          <div className="p-8 flex flex-col items-center gap-4 bg-slate-50 border-t border-black/5">
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">ΠΕΡΙΣΤΡΟΦΗ ΚΑΡΤΑΣ</span>
             <button 
               onClick={handleRotateClick}
               className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group/btn"
             >
                <i className="fa-solid fa-rotate text-2xl group-hover/btn:rotate-180 transition-transform duration-700"></i>
             </button>
          </div>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-slate-900 flex flex-col p-10 items-center justify-between text-center">
          <div className="absolute top-12 left-12 text-blue-500/10 text-[12rem] font-serif leading-none select-none">“</div>
          
          <div className="flex-1 flex flex-col items-center justify-center gap-10 z-10 mt-12">
             <div className="px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[12px] uppercase tracking-[0.5em] font-black">ΣΤΟΧΑΣΜΟΣ</div>
             <h2 className="text-3xl md:text-5xl font-extralight leading-snug text-slate-100 px-6 tracking-tight font-serif italic">
               {card.question}
             </h2>
          </div>

          <div className="w-full flex flex-col items-center gap-6 z-10 mb-8 border-t border-white/5 pt-10">
            <span className="text-blue-500/40 text-[9px] uppercase tracking-[0.5em] font-black">ΠΕΡΙΣΤΡΟΦΗ ΓΙΑ ΕΙΚΟΝΑ</span>
            <button 
              onClick={handleRotateClick}
              className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-90 transition-all group/btn"
            >
              <i className="fa-solid fa-wand-magic-sparkles text-3xl group-hover/btn:rotate-12 transition-transform"></i>
            </button>
          </div>
          
          <div className="absolute bottom-12 right-12 text-blue-500/10 text-[12rem] font-serif rotate-180 leading-none select-none">“</div>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-x-180 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-black flex flex-col items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-10">
              <div className="relative">
                <div className="w-28 h-28 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-6 border-4 border-indigo-500/10 border-b-indigo-500 rounded-full animate-spin-slow"></div>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-[12px] uppercase tracking-[0.7em] text-blue-400 font-black animate-pulse">ΟΡΑΜΑΤΙΣΜΟΣ</p>
                <p className="text-slate-600 text-[10px] uppercase tracking-widest font-medium">Η ΤΕΧΝΗΤΗ ΝΟΗΜΟΣΥΝΗ ΔΗΜΙΟΥΡΓΕΙ...</p>
              </div>
            </div>
          ) : (
            <>
              <img 
                src={generatedImageUrl || ''} 
                className="w-full h-full object-cover opacity-80 transition-opacity duration-1000" 
                alt="AI Generated Art"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-12 flex flex-col items-center gap-10">
                <div className="text-center max-w-[80%]">
                   <div className="text-white/40 text-[10px] uppercase tracking-[0.6em] font-black mb-3">ΤΕΛΟΣ ΣΤΟΧΑΣΜΟΥ</div>
                   <p className="text-white/90 text-sm font-light italic leading-relaxed">{card.question}</p>
                </div>
                
                <button 
                  onClick={resetCard}
                  className="w-16 h-16 rounded-full border border-white/20 backdrop-blur-3xl bg-white/5 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all group/reset"
                >
                  <i className="fa-solid fa-rotate-left text-2xl group-hover/reset:-rotate-180 transition-transform duration-700"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

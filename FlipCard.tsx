import React, { useState, useEffect, useRef } from 'react';
import { CardData } from './types';
import { generateAIImage } from './AiService';

interface FlipCardProps {
  card: CardData;
  index: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ card, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // ΑΥΤΟΜΑΤΟ ΓΥΡΙΣΜΑ: Αν η κάρτα βγει από το οπτικό πεδίο, ξαναγίνεται "ΒΛΕΜΜΑ"
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isFlipped) {
          setIsFlipped(false);
        }
      },
      { threshold: 0.1 } // Αν χαθεί το 90% της κάρτας, γυρίζει πίσω
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isFlipped]);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFlipped) {
      setIsFlipped(true);
      if (!imageUrl && !loading) {
        setLoading(true);
        const url = await generateAIImage(card.question);
        setImageUrl(url);
        setLoading(false);
      }
    } else {
      setIsFlipped(false);
    }
  };

  return (
    <div 
      ref={cardRef} 
      className="perspective w-[85vw] max-w-[350px] h-[60vh] max-h-[500px] md:w-[400px] md:h-[600px] cursor-pointer mx-auto" 
      onClick={toggle}
    >
      <div className={`card-inner relative w-full h-full preserve-3d duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* ΟΨΗ 1: COVER */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-[2rem] flex flex-col items-center justify-center p-6 text-slate-900 shadow-2xl">
          <div className="text-5xl mb-6">👁️</div>
          <h3 className="text-4xl font-serif italic uppercase tracking-tighter text-center">Βλέμμα</h3>
          <span className="mt-4 text-[9px] opacity-30 tracking-[0.4em] uppercase">Κάρτα {index + 1}</span>
        </div>

        {/* ΟΨΗ 2: IMAGE + QUESTION */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
          {loading && !imageUrl ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-900">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[9px] text-blue-500 tracking-widest uppercase">Οραματισμός...</span>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={imageUrl || 'https://images.unsplash.com/photo-1549490349-8643362247b5'} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="AI Art" />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 p-8 text-center">
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-white drop-shadow-xl">
                  {card.question}
                </p>
                <div className="mt-6 text-blue-400/40 text-[7px] tracking-[0.6em] uppercase">ZenFlip AI</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

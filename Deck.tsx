
import React, { useRef, useEffect } from 'react';
import FlipCard from './FlipCard';
import { CardData } from './types';

interface DeckProps {
  cards: CardData[];
}

const Deck: React.FC<DeckProps> = ({ cards }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayCards = [...cards, ...cards, ...cards]; 

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || cards.length === 0) return;
    const totalWidth = container.scrollWidth;
    const sectionWidth = totalWidth / 3;
    if (container.scrollLeft === 0) {
      container.scrollLeft = sectionWidth;
    }
    const handleScroll = () => {
      const currentScroll = container.scrollLeft;
      if (currentScroll >= sectionWidth * 2) {
        container.scrollLeft = currentScroll - sectionWidth;
      }
      else if (currentScroll <= 0) {
        container.scrollLeft = currentScroll + sectionWidth;
      }
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [cards]);

  const scrollManual = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const gap = window.innerWidth < 768 ? 20 : 32;
      const cardWidth = 300 + gap;
      const amount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-12 py-1 md:py-2">
      <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <button 
          onClick={() => scrollManual('left')}
          className="w-14 h-14 bg-slate-900/90 text-white rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md shadow-2xl hover:bg-blue-600 transition-colors"
        >
          <i className="fa-solid fa-chevron-left text-xl"></i>
        </button>
      </div>
      
      <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <button 
          onClick={() => scrollManual('right')}
          className="w-14 h-14 bg-slate-900/90 text-white rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md shadow-2xl hover:bg-blue-600 transition-colors"
        >
          <i className="fa-solid fa-chevron-right text-xl"></i>
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-5 md:gap-8 no-scrollbar pb-8 pt-2 touch-pan-x overscroll-x-contain"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'none',
        }}
      >
        {displayCards.map((card, index) => (
          <div 
            key={`${card.id}-${index}`} 
            className="flex-shrink-0"
            style={{ transform: 'translateZ(0)' }}
          >
            <FlipCard card={card} index={index % cards.length} />
          </div>
        ))}
      </div>

      <div className="mt-1 flex flex-col items-center gap-2">
        <div className="text-slate-500 text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black opacity-30 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-slate-800"></span>
          <span>ΕΛΕΥΘΕΡΗ ΚΥΛΙΣΗ</span>
          <span className="w-8 h-[1px] bg-slate-800"></span>
        </div>
      </div>
    </div>
  );
};

export default Deck;

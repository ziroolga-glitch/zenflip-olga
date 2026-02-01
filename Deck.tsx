
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
    const sectionWidth = container.scrollWidth / 3;
    if (container.scrollLeft === 0) container.scrollLeft = sectionWidth;

    const handleScroll = () => {
      if (container.scrollLeft >= sectionWidth * 2) container.scrollLeft -= sectionWidth;
      else if (container.scrollLeft <= 0) container.scrollLeft += sectionWidth;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [cards]);

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-auto gap-8 no-scrollbar px-[15vw] py-10 touch-pan-x"
    >
      {displayCards.map((card, idx) => (
        <div key={`${card.id}-${idx}`} className="flex-shrink-0">
          <FlipCard card={card} index={idx % cards.length} />
        </div>
      ))}
    </div>
  );
};

export default Deck;

export default Deck;


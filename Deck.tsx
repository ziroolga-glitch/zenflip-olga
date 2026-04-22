
import React from 'react';
import FlipCard from './FlipCard';
import { CardData } from './types';

interface DeckProps {
  cards: CardData[];
}

const Deck: React.FC<DeckProps> = ({ cards }) => {
  return (
    /* Προσθέτουμε snap-x snap-mandatory για το κεντράρισμα */
    <div className="w-full h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory flex items-center gap-8 px-[10vw]">
      {cards.map((card, index) => (
        /* Κάθε κάρτα γίνεται snap-center */
        <div key={card.id} className="snap-center shrink-0">
          <FlipCard card={card} index={index} />
        </div>
      ))}
    </div>
  );
};

export default Deck;

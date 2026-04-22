import React from 'react';
import FlipCard from './FlipCard';
import { CardData } from './types';

interface DeckProps {
  cards: CardData[];
}

const Deck: React.FC<DeckProps> = ({ cards }) => {
  return (
    /* Προσθέσαμε -webkit-overflow-scrolling και snap-align για μέγιστη συμβατότητα */
    <div className="w-full h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex items-center gap-4 px-[10vw] scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
      {cards.map((card, index) => (
        <div key={card.id} className="snap-center shrink-0 w-full flex justify-center items-center">
          <FlipCard card={card} index={index} />
        </div>
      ))}
    </div>
  );
};

export default Deck;

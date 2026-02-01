
export interface CardData {
  id: string;
  question: string;
  category: string;
  imageUrl: string;
}

export enum CardSide {
  FRONT = 'FRONT',
  BACK = 'BACK'
}

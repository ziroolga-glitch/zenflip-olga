
export interface CardData {
  id: string;
  question: string;
  category: string;
  imageUrl?: string;
}

export enum CardSide {
  COVER = 'COVER',
  QUESTION = 'QUESTION',
  IMAGE = 'IMAGE'
}

import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  isEditable?: boolean;
  setRating?: (rating: number) => void;
  rating: number;
}

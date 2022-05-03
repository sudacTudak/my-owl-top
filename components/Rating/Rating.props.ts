import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  isEditable?: boolean;
  setRating?: (rating: number) => void;
  rating: number;
  error?: FieldError;
}

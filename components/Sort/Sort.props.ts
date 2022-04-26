import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  currentSort: SortType;
  setSort: (type: SortType) => void;
}

export enum SortType {
  Rating,
  Price
}

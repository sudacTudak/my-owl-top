import { DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  size?: 'small' | 'medium';
  color?: 'ghost' | 'gray' | 'red' | 'green' | 'primary';
  href?: string;
}

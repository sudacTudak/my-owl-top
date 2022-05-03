import ArrowUpIcon from './arrow-up.svg';
import CloseIcon from './close.svg';
import BurgerIcon from './burger.svg';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const btnIcons = {
  arrowUp: ArrowUpIcon,
  close: CloseIcon,
  burger: BurgerIcon
};

export type IconType = keyof typeof btnIcons;

export interface ButtonIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance: 'primary' | 'white';
  icon: IconType;
}

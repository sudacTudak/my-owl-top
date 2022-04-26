import { CardProps } from "./Card.props";
import styles from './Card.module.scss';
import cn from "classnames";

export const Card = ( {color = 'white', children, className}: CardProps): JSX.Element => {
  return (
    <div className={cn(styles.card, styles[color], className)}>
      {children}
    </div>
  );
};

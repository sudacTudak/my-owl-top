import { PtagProps } from './Ptag.props';
import styles from './Ptag.module.scss';
import cn from 'classnames';

export const Ptag = ({ size = 'medium', children, className, ...props }: PtagProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, styles[size])}
      {...props}
    >
      {children}
    </p>
  );
};

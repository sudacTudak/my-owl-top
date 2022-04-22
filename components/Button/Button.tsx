import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';
import cn from 'classnames';
import ArrowIcon from './Arrow.svg';

export const Button = ({ appearance, children, arrow = 'none', className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, styles[appearance])}
      {...props}
    >
      {children}
      {arrow != 'none' && <span
        className={cn(styles.arrow, {
          [styles.arrowDown]: arrow == 'down',
      })}
      >
        <ArrowIcon/>
      </span>}
    </button>
  );
};

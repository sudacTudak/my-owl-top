import { TagProps } from './Tag.props';
import styles from './Tag.module.scss';
import cn from 'classnames';

export const Tag = ({ size = 'small', color = 'ghost', href, children, className, ...props }: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, styles[size], styles[color])}
      {...props}
    >
      {
        href
          ? <a href={href}>{children}</a>
          : <>{children}</>
      }
    </div>
  );
};

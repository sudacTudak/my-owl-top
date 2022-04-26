import { SortProps, SortType } from "./Sort.props";
import cn from "classnames";
import styles from './Sort.module.scss';
import SortIcon from './sort.svg';

export const SortComponent = ({ currentSort, setSort, className, ...props }: SortProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sort)} {...props}>
      <button
        onClick={() => setSort(SortType.Rating)}
        className={cn(styles.btn, {
          [styles.active]: currentSort === SortType.Rating
      })}>
        <SortIcon/>
        <span className={styles.label}>По рейтингу </span>
      </button>
      <button
        onClick={() => setSort(SortType.Price)}
        className={cn(styles.btn, {
          [styles.active]: currentSort === SortType.Price
      })}>
        <SortIcon/>
        <span className={styles.label}>По цене </span>
      </button>
    </div>
  );
};

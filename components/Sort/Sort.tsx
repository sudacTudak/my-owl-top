import { SortProps, SortType } from "./Sort.props";
import cn from "classnames";
import styles from './Sort.module.scss';
import SortIcon from './sort.svg';

export const Sort = ({ currentSort, setSort, className, ...props }: SortProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sort)} {...props}>
      <div id='sort' className={styles.sortTitle}>Сортировка</div>
      <button
        id='sortRating'
        onClick={() => setSort(SortType.Rating)}
        className={cn(styles.btn, {
          [styles.active]: currentSort === SortType.Rating
      })}
        aria-labelledby='sort sortRating'
        aria-selected={currentSort == SortType.Rating}
      >
        <SortIcon/>
        <span className={styles.label}>По рейтингу </span>
      </button>
      <button
        id='sortPrice'
        onClick={() => setSort(SortType.Price)}
        className={cn(styles.btn, {
          [styles.active]: currentSort === SortType.Price
      })}
        aria-labelledby='sort sortPrice'
        aria-selected={currentSort == SortType.Price}
      >
        <SortIcon/>
        <span className={styles.label}>По цене </span>
      </button>
    </div>
  );
};

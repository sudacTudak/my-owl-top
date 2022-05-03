import { RatingProps } from "./Rating.props";
import styles from './Rating.module.scss';
import cn from "classnames";
import StarIcon from './star.svg';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef,} from "react";

export const Rating = forwardRef(({ rating, setRating, isEditable, error,  ...props }: RatingProps, ref: ForwardedRef<HTMLUListElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));

  useEffect( () => {
    constructRating(rating);
  }, [rating]);

  function constructRating(currentRating: number): void {
    const updatedArray = ratingArray.map( (r, i) => {
      return (
        <button
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          type='button'
          onClick={(): void => changeRating(i + 1)}
          onMouseEnter={(): void => changeDisplay(i + 1)}
          onKeyDown={(e: KeyboardEvent<HTMLButtonElement>): void => handleSpace(i + 1, e)}
        >
          <StarIcon/>
        </button>
      );
    });

    setRatingArray(updatedArray);
  }

  function changeRating(ratingIndex: number): void {
    if (!isEditable || !setRating) {
      return;
    }

    setRating(ratingIndex);
  }

  function changeDisplay(ratingIndex: number): void {
    if (!isEditable) {
      return;
    }

    constructRating(ratingIndex);
  }

  function handleSpace(ratingIndex: number, e: KeyboardEvent<HTMLButtonElement>): void {
    if (e.code != 'Space') {
      return;
    }

    changeRating(ratingIndex);
  }

  return (
    <div className={styles.ratingWrapper}>
      <ul
        className={cn(styles.list, {
          [styles.error]: error,
        })}
        onMouseLeave={(): void => {changeDisplay(rating);}}
        ref={ref}
        {...props}
      >
        {ratingArray.map( (r, i) => (<li className={styles.listItem} key={i}>{r}</li>))}
      </ul>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});

import { RatingProps } from "./Rating.props";
import styles from './Rating.module.scss';
import cn from "classnames";
import StarIcon from './star.svg';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef,} from "react";

export const Rating = forwardRef(({ rating, setRating, isEditable = false, error, tabIndex,  ...props }: RatingProps, ref: ForwardedRef<HTMLUListElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));
  const ratingArrayRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect( () => {
    constructRating(rating);
  }, [rating, tabIndex]);

  function computeFocus(currentRating: number, index: number): number {
    if (!isEditable) {
      return -1;
    }
    if (!rating && index === 0) {
      return tabIndex ?? 0;
    }
    if (currentRating === index + 1) {
      return tabIndex ?? 0;
    }

    return -1;
  }

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
          onKeyDown={(e: KeyboardEvent<HTMLButtonElement>): void => handleKey (e)}
          tabIndex={computeFocus(rating, i)}
          ref={r => ratingArrayRef.current?.push(r)}
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

  function handleKey(e: KeyboardEvent<HTMLButtonElement>): void {
    if (!isEditable || !setRating) {
      return;
    }

    if (e.code == 'ArrowUp' || e.code == 'ArrowRight') {
      e.preventDefault();
      if (!rating) {
        setRating(1);
      } else {
        setRating(rating < 5 ? rating + 1 : 5);
      }
      ratingArrayRef.current[rating]?.focus();
    }

    if (e.code == 'ArrowDown' || e.code == 'ArrowLeft') {
      e.preventDefault();
      setRating(rating > 1 ? rating - 1 : 1);
      ratingArrayRef.current[rating - 2]?.focus();
    }

    if (e.code == 'Space' || e.code == 'Enter') {
      changeRating(rating);
    }
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

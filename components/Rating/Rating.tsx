import { RatingProps } from "./Rating.props";
import styles from './Rating.module.scss';
import cn from "classnames";
import StarIcon from './star.svg';
import { useEffect, useState, KeyboardEvent,} from "react";

export const Rating = ({ rating, setRating, isEditable, ...props }: RatingProps): JSX.Element => {
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
    <ul
      className={styles.list}
      onMouseLeave={(): void => {changeDisplay(rating);}}
      {...props}
    >
      {ratingArray.map( (r, i) => (<li className={styles.listItem} key={i}>{r}</li>))}
    </ul>
  );
};

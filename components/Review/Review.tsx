import { ReviewProps } from "./Review.props";
import styles from './Review.module.scss';
import cn from "classnames";
import UserAvatar from './user.svg';
import { Rating } from "../Rating/Rating";
import { Ptag } from "../Ptag/Ptag";
import { format } from "date-fns";
import { ru } from "date-fns/locale";


export const Review = ({review, className} : ReviewProps): JSX.Element => {
  const {name, title, description, createdAt, rating} = review;

  return (
    <div className={cn(styles.review, className)}>
      <div className={styles.avatar}>
        <UserAvatar/>
      </div>
      <div className={styles.info}>
        <span className={styles.username}>{name}:</span>
        &nbsp;&nbsp;
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={rating}/>
      </div>
      <Ptag size='small' className={styles.description}>{description}</Ptag>
    </div>
  );
};

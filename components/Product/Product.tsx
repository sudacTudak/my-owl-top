import { ProductProps } from './Product.props';
import cn from 'classnames';
import styles from './Product.module.scss';
import { Card } from '../Card/Card';
import { Tag } from '..';
import { Rating } from '../Rating/Rating';
import { Ptag } from '../Ptag/Ptag';
import { Divider } from '../Divider/Divider';
import { Button } from '../Button/Button';
import { declOfNum, normalizePriceRu } from '../../helpers/helpers';
import { Htag } from '../HTag/Htag';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [reviewOpened, setReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const reviewAnimVars = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: 'auto',
    }
  };

  function scrollToReview(): void {
    setReviewOpened(true);
    reviewRef.current?.scrollIntoView(true);
    reviewRef.current?.focus();
  }

  return (
    <div className={className} ref={ref} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={/^https?:\/\//i.test(product.image) ? product.image : process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
            layout='fixed'
          />
        </div>
        <Htag tag='h3' className={styles.title}>{product.title} </Htag>
        <div className={styles.price}>
          <div className={styles.currentPrice}>
            <span className='visuallyHidden'>Цена: </span>
            {product.price ? normalizePriceRu(product.price) : 'No info'}
          </div>
          {product.price && (
            <Tag color='green' className={styles.discount}>
              <span className='visuallyHidden'>Величина скидки: </span>
              {normalizePriceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          <span className='visuallyHidden'>В кредит:</span>
          {product.credit ? normalizePriceRu(product.credit) : 'No info'}
          {product.credit && <span className={styles.month}>/мес</span>}
        </div>
        <div className={styles.rating}>
          <span className='visuallyHidden'>Рейтинг: {product.reviewAvg ?? product.initialRating} из 5</span>
          <Rating rating={product.reviewAvg ?? product.initialRating}/>
        </div>
        <div className={styles.tags}>
          <span className='visuallyHidden'>Категории: </span>
          {
            product.categories.map(category =>
              <div className={styles.tag} key={category}>
                <Tag color='ghost' size='small'>{category}</Tag>
              </div>
            )
          }
        </div>
        <div className={styles.priceLabel} aria-hidden='true'>цена</div>
        <div className={styles.creditLabel} aria-hidden='true'>в кредит</div>
        <div className={styles.ratingLabel}>
          <a href="#ref" onClick={scrollToReview}>
            {product.reviewCount + ' ' + declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>
        <Divider className={cn(styles.divider, styles.dividerFirst)}/>
        <div className={styles.description}>
          <Ptag size='medium'>{product.description}</Ptag>
        </div>
        <div className={styles.characteristics}>
          {product.characteristics.map(character => (
            <div key={character.name} className={styles.characteristic}>
              <div className={styles.characteristicName}>{character.name}</div>
              <div className={styles.characteristicDots}></div>
              <div className={styles.characteristicValue}>{character.value}</div>
            </div>
          ))}
        </div>
        {(product.advantages || product.disadvantages) &&
          <div className={styles.features}>
            {product.advantages && <div className={cn(styles.feature, styles.advantages)}>
                <div className={styles.featureTitle}>Преимущества</div>
                <p className={styles.featureText}>{product.advantages}</p>
              </div>
            }
            {product.disadvantages && <div className={cn(styles.feature, styles.disadvantages)}>
                <div className={styles.featureTitle}>Недостатки</div>
                <p className={styles.featureText}>{product.advantages}</p>
              </div>
            }
          </div>
        }
        <Divider className={cn(styles.divider, styles.dividerSecond)}/>
        <div className={styles.actions}>
          <Button className={styles.btn} appearance='primary' > Узнать подробнее </Button>
          <Button
            className={cn(styles.btn, styles.btnReviews)}
            appearance='ghost'
            arrow={reviewOpened ? 'down' : 'right'}
            onClick={(): void => {setReviewOpened(!reviewOpened);}}
          > Читать отзывы </Button>
        </div>
      </Card>
      <motion.div
        variants={reviewAnimVars}
        initial={'hidden'}
        animate={reviewOpened ? 'visible' : 'hidden'}
        className={styles.reviewsWrap}
      >
        <Card color='blue' className={styles.reviews} ref={reviewRef} tabIndex={reviewOpened ? 0 : -1}>
          {product.reviewCount > 0 && product.reviews.map(review => (
            <div key={review._id}>
              <Review review={review}/>
              <Divider/>
            </div>
          ))}
          <ReviewForm productId={product._id} isOpened={reviewOpened}/>
        </Card>
      </motion.div>
    </div>
  );
}));

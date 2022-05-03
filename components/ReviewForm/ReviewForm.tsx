import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.scss';
import CloseIcon from './close.svg';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, className }: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit, reset, formState: { errors }} = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');

  async function onSubmit(formData: IReviewForm): Promise<void> {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo,
        { ...formData, productId }
      );

      if (data.message) {
        setIsSuccess(true);
        setIsError('');
        reset();
      } else {
        setIsError('Упс, что-то пошло не так');
        setIsSuccess(false);
      }
    } catch (e) {
      if (e instanceof Error) {
        setIsError(e.message);
        setIsSuccess(false);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)}>
        <Input
          {...register('name', { required: {
            value: true,
            message: 'Введите имя',
          }})}
          placeholder='Имя'
          className={styles.name}
          error={errors?.name}
        />
        <Input
          {...register('title', { required: {
            value: true,
            message: 'Введите заголовок'
          }})}
          placeholder='Заголовок отзыва'
          className={styles.title}
          error={errors?.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            name='rating'
            control={control}
            rules={{required: {
              value: true,
              message: 'Оцените курс',
            }}}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors?.rating}
              />
            )}
          />
        </div>
        <TextArea
          {...register('description', { required: {
            value: true,
            message: 'Введите текст отзыва',
          }})}
          placeholder='Текст отзыва'
          className={styles.text}
          error={errors?.description}
        />
        <div className={styles.footer}>
          <Button appearance='primary' className={styles.btn}>Отправить</Button>
          <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && <div className={cn(styles.notification ,styles.success)}>
          <div className={styles.titleNotification}>Отзыв отправлен!</div>
          <span>Спасибо! Ваш отзыв будет опубликован после проверки</span>
          <button type='submit' className={styles.close} onClick={() => {setIsSuccess(false);}}>
            <CloseIcon/>
          </button>
        </div>
      }
      {isError && <div className={cn(styles.notification ,styles.error)}>
          <div className={styles.titleNotification}>Произошла ошибка!</div>
          <span>Что-то пошло не так. Попробуйте обновить страницу и повторить.</span>
          <button type='submit' className={styles.close} onClick={() => {setIsError('');}}>
            <CloseIcon/>
          </button>
        </div>
      }
    </form>
  );
};

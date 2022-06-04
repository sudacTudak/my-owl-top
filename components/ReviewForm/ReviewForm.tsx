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

export const ReviewForm = ({ productId, isOpened, className }: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit, reset, formState: { errors }, clearErrors} = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function onSubmit(formData: IReviewForm): Promise<void> {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo,
        { ...formData, productId }
      );

      if (data.message) {
        setIsSuccess(true);
        setError('');
        reset();
      } else {
        setError('Упс, что-то пошло не так');
        setIsSuccess(false);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        setIsSuccess(false);
      }
    }
  }

  return (
    <>
      <span className='visuallyHidden'>Форма отправки отзыва</span>
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
            tabIndex={isOpened ? 0 : -1}
            aria-invalid={!!errors.name}
          />
          <Input
            {...register('title', { required: {
              value: true,
              message: 'Введите заголовок'
            }})}
            placeholder='Заголовок отзыва'
            className={styles.title}
            error={errors?.title}
            tabIndex={isOpened ? 0 : -1}
            aria-invalid={!!errors.title}
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
                  tabIndex={isOpened ? 0 : -1}
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
            tabIndex={isOpened ? 0 : -1}
            aria-label='Введите текст отзыва'
            aria-invalid={!!errors.description}
          />
          <div className={styles.footer}>
            <Button appearance='primary' className={styles.btn} tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
            <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
          </div>
        </div>
        {isSuccess && <div className={cn(styles.notification ,styles.success)} role='alert'>
            <div className={styles.titleNotification}>Отзыв отправлен!</div>
            <span>Спасибо! Ваш отзыв будет опубликован после проверки</span>
            <button
              type='submit'
              className={styles.close}
              aria-label={'Закрыть оповещение'}
              onClick={() => {setIsSuccess(false);}}
            >
              <CloseIcon/>
            </button>
          </div>
        }
        {error && <div className={cn(styles.notification ,styles.error)} role='alert'>
            <div className={styles.titleNotification}>Произошла ошибка!</div>
            <span>Что-то пошло не так. Попробуйте обновить страницу и повторить.</span>
            <button
              type='submit'
              className={styles.close}
              aria-label={'Закрыть оповещение'}
              onClick={() => {setError('');}}
            >
              <CloseIcon/>
            </button>
          </div>
        }
      </form>
    </>
  );
};

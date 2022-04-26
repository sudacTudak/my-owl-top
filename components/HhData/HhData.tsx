import { HhDataProps } from './HhData.props';
import styles from './HhData.module.scss';
import cn from "classnames";
import { Card } from '../Card/Card';
import Star from './Star.svg';
import { normalizePriceRu } from '../../helpers/helpers';

export const HhData = ({count, juniorSalary, middleSalary, seniorSalary}: HhDataProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card className={styles.hhTotal}>
        <div className={cn(styles.hhTotalLabel, styles.hhLabel)}>Всего вакансий</div>
        <div className={styles.hhCount}>{count}</div>
      </Card>
      <Card className={styles.hhVacancies}>
        <div className={styles.vacancy}>
          <div className={cn(styles.vacancyLabel, styles.hhLabel)}>Начальный</div>
          <div className={styles.vacancySalary}>{normalizePriceRu(juniorSalary)}</div>
          <div className={styles.vacancyRate}>
            <div className={cn(styles.star, styles.starFilled)}>
              <Star/>
            </div>
            <div className={styles.star}>
              <Star/>
            </div>
            <div className={styles.star}>
              <Star/>
            </div>
          </div>
        </div>
        <div className={styles.vacancy}>
          <div className={cn(styles.vacancyLabel, styles.hhLabel)}>Средний</div>
          <div className={styles.vacancySalary}>{normalizePriceRu(middleSalary)}</div>
          <div className={styles.vacancyRate}>
            <div className={cn(styles.star, styles.starFilled)}>
              <Star/>
            </div>
            <div className={cn(styles.star, styles.starFilled)}>
              <Star/>
            </div>
            <div className={styles.star}>
              <Star/>
            </div>
          </div>
        </div>
        <div className={styles.vacancy}>
          <div className={cn(styles.vacancyLabel, styles.hhLabel)}>Профессионал</div>
          <div className={styles.vacancySalary}>{normalizePriceRu(seniorSalary)}</div>
          <div className={styles.vacancyRate}>
            <div className={cn(styles.star, styles.starFilled)}>
              <Star/>
            </div>
            <div className={cn(styles.star, styles.starFilled)}>
              <Star/>
            </div>
            <div className={cn(styles.star, styles.starFilled)}>
              <Star/>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

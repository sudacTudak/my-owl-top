import { AdvantagesProps } from "./Advantages.props";
import styles from './Advantages.module.scss';
import Check from './Check.svg';
import { Htag } from "../HTag/Htag";
import { Ptag } from "../Ptag/Ptag";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <ul className={styles.advantages}>
      {advantages.map(advantage => <li key={advantage._id} className={styles.advantagesItem}>
        <div className={styles.advantage}>
          <div className={styles.advantageLeft}>
            <div className={styles.icon}>
              <Check/>
            </div>
            {advantage.description && <div className={styles.line}></div>}
          </div>
          <div className={styles.advantageRight}>
            <Htag tag='h3' className={styles.title}>{advantage.title}</Htag>
            {advantage.description && <Ptag className={styles.description} size='large'>{advantage.description}</Ptag>}
          </div>
        </div>
      </li>)}
    </ul>
  );
};

import { FooterProps } from "./Footer.props";
import styles from './Footer.module.scss';
import cn from "classnames";
import { format } from 'date-fns';

export const Footer = ({className, ...props}: FooterProps): JSX.Element => {
  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <div className={styles.footer__column}>
        <span className={cn(styles.text, styles.footer__copyright)}>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</span>
      </div>
      <ul className={cn(styles.footer__column, styles.linkList)}>
        <li className={styles.linkList__item}>
          <a href="#" className={cn(styles.text, styles.linkList__link)}>Пользовательское соглашение</a>
        </li>
        <li className={styles.linkList__item}>
          <a href="#" className={cn(styles.text, styles.linkList__link)}>Политика конфиденциальности</a>
        </li>
      </ul>
    </footer>
  );
};

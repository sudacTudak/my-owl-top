import { GoBackBtn, Ptag } from "../../components";
import styles from './Page404Component.module.scss';

export const Page404Component = ():JSX.Element => {
  return (
    <div className="container">
      <h1 className="visuallyHidden">Страница не найдена</h1>
      <GoBackBtn className={styles.goBack}/>
      <div className={styles.wrap}>
        <div className={styles.message}>Произошла ошибка: указанной страницы не существует</div>
        <Ptag size="small" className={styles.description}>
          Пожалуйста, удостоверьтесь в правильности указанной Вами страницы и повторите попытку.
        </Ptag>
      </div>
    </div>
  );
};

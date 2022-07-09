import { GoBackBtn, Ptag } from '../../components';
import styles from './Page500Component.module.scss';

export const Page500Component = ():JSX.Element => {
  return (
    <div className="container">
      <h1 className="visuallyHidden">Ошибка соединения с сервером</h1>
      <GoBackBtn className={styles.goBack}/>
      <div className={styles.wrap}>
        <div className={styles.message}>Произошла ошибка: сервер не отвечает</div>
        <Ptag size="small" className={styles.description}>
          Мы приносим свои извинения. Пожалуйста, повторите попытку позже.
        </Ptag>
      </div>
    </div>
  );
};

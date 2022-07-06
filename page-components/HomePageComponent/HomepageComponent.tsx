import Link from "next/link";
import { firstLevelMenu } from "../../helpers/helpers";
import { Card, Htag, Ptag } from "../../components";
import styles from './HomepageComponent.module.scss';

export const HomepageComponent = (): JSX.Element => (
  <div className="container">
    <Htag tag="h1" className={styles.title}>My OWL Top - каталог курсов и сервисов</Htag>
    <Ptag size="medium" className={styles.label}>Подборки лучших курсов и серсвисов, основанные на отзывах реальных людей.</Ptag>
    <ul className={styles.categoryList}>
      {firstLevelMenu.map(menuItem => (
        <li key={menuItem.route} className={styles.categoryItem}>
          <Link href={`/${menuItem.route}`}>
            <a>
              <Card color="blue" className={styles.categoryCard}>
                <div className={styles.categoryIcon}>{menuItem.icon}</div>
                <Htag tag="h3" className={styles.categoryName}>{menuItem.name}</Htag>
              </Card>
            </a>
          </Link>
        </li>
      ))
      }
    </ul>
  </div>
)

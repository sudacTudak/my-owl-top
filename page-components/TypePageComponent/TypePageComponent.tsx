import Link from "next/link";
import styles from './TypePageComponent.module.scss';
import { TypePageComponentProps } from "./TypePageComponent.props";
import { firstLevelMenu } from "../../helpers/helpers";
import { PageItem } from "../../interfaces/menu.interface";
import { Card, Htag } from "../../components";

export const TypePageComponent = ({ menu, firstCategory }: TypePageComponentProps): JSX.Element => {

  function renderCategories(): JSX.Element {
    return (
      <ul className={styles.categoryList}>
        {
          menu.map(secondCategory => (
            <li
              key={secondCategory._id.secondCategory}
              className={styles.categoryItem}
            >
              <Card
                color="blue"
                className={styles.categoryCard}
              >
                <div className={styles.categoryTitle}>{secondCategory._id.secondCategory}</div>
                {renderPageLinks(secondCategory.pages)}
              </Card>
            </li>

          ))
        }
      </ul>
    );
  }

  function renderPageLinks(pages: PageItem[]): JSX.Element {
    return (
      <ul className={styles.pageList}>
        {
          pages.map(page => {
            const route = `/${firstLevelMenu[firstCategory].route}/${page.alias}`

            return (
              <li
                key={page._id}
                className={styles.pageItem}
              >
                <Link href={route}>
                  <a className={styles.pageLink}>{page.title}</a>
                </Link>
              </li>
            );
          })
        }
      </ul>
    );
  }

  return (
    <div className="container">
      <div className={styles.blockTitle}>
        <div className={styles.icon}>
          {firstLevelMenu[firstCategory].icon}
        </div>
        <Htag tag="h1">{firstLevelMenu[firstCategory].name}</Htag>
      </div>
      {renderCategories()}
    </div>
  );
};

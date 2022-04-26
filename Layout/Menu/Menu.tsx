import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import styles from './Menu.module.scss';
import { TopLevelCategory } from "../../interfaces/page.interface";
import cn from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import { firstLevelMenu } from "../../helpers/helpers";

export const Menu = (): JSX.Element => {
  const {menu, setMenu, firstCategory} = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (secondCategory: string):void => {
    if (!setMenu) { return; }

    const newMenu = menu.map(menuItem => {
      if (menuItem._id.secondCategory == secondCategory) {
        menuItem.isOpened = !menuItem.isOpened;
      }
      return menuItem;
    });

    setMenu(newMenu);
  };

  function renderFirstLevel(firstCategory: TopLevelCategory): JSX.Element {
    return (
      <ul className={styles.firstLevelBlock}>
        {firstLevelMenu.map(firstItem => (
          <li key={firstItem.route} className={cn(styles.firstLevelItem, {
            [styles.firstLevelItemActive]: firstItem.id == firstCategory
          })}>
            <Link href={`/${firstItem.route}`}>
              <a className={styles.firstLevelLink}>
                <div className={styles.firstLevelIcon}>
                  {firstItem.icon}
                </div>
                <span>
                  {firstItem.name}
                </span>
              </a>
            </Link>
            {firstItem.id == firstCategory && renderSecondLevel(firstItem)}
          </li>
        ))}
      </ul>
    );
  }

  function renderSecondLevel(firstItem: FirstLevelMenuItem): JSX.Element {
    return (
      <ul className={styles.secondLevelBlock}>
        {menu.map(secondItem => {
          if (secondItem.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            secondItem.isOpened = true;
          }
          return (
            <li key={secondItem._id.secondCategory} className={styles.secondLevelItem}>
              <button
                onClick={() => {openSecondLevel(secondItem._id.secondCategory);}}
                className={styles.secondLevelBtn}
              >
                {secondItem._id.secondCategory}
              </button>
              <ul className={cn(styles.thirdLevelBlock, {
                [styles.thirdLevelBlockOpened]: secondItem.isOpened
              })}>
                {buildThirdLevel(secondItem.pages, firstItem.route)}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }

  function buildThirdLevel(pages: PageItem[], route: string): JSX.Element {
    return (
      <>
        {pages.map(page => (
          <li key={page._id} className={cn(styles.thirdLevelItem, {
            [styles.thirdLevelItemActive]: router.asPath == `/${route}/${page.alias}`
          })}>
            <Link href={`/${route}/${page.alias}`}>
              <a className={styles.thirdLevelLink}>{page.category}</a>
            </Link>
          </li>
        ))}
      </>
    );
  }

  return (
    <nav className={styles.menu}>
      {renderFirstLevel(firstCategory)}
    </nav>
  );
};

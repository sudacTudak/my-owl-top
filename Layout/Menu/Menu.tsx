import { useContext, KeyboardEvent, useState } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import styles from './Menu.module.scss';
import { TopLevelCategory } from "../../interfaces/page.interface";
import cn from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import { firstLevelMenu } from "../../helpers/helpers";
import { motion } from "framer-motion";

export const Menu = (): JSX.Element => {
  const {menu, setMenu, firstCategory} = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();

  const variantsThirdParent = {
    visible: {
      paddingTop: 13,
      paddingBottom: 10,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hidden: {
      paddingTop: 0,
      paddingBottom: 0,
    }
  };

  const variantsThirdChildren = {
    visible: {
      opacity: 1,
      height: 'auto',
      marginBottom: 10,

    },
    hidden: {
      opacity: 0,
      height: 0,
      marginBottom: 0
    }
  };

  function openSecondLevel(secondCategory: string):void {
    if (!setMenu) { return; }
    const newMenu = menu.map(menuItem => {
      if (menuItem._id.secondCategory == secondCategory) {
        setAnnounce(menuItem.isOpened ? 'closed' : 'opened');
        menuItem.isOpened = !menuItem.isOpened;
      }
      return menuItem;
    });

    setMenu(newMenu);
  }

  function openSecondLevelKeyboard(key: KeyboardEvent, secondCategory: string): void {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  }

  function renderFirstLevel(firstCategory: TopLevelCategory): JSX.Element {
    return (
      <ul className={styles.firstLevelBlock}>
        {firstLevelMenu.map(firstItem => (
          <li key={firstItem.route} className={cn(styles.firstLevelItem, {
            [styles.firstLevelItemActive]: firstItem.id == firstCategory
          })}>
            <Link href={`/${firstItem.route}`}>
              <a className={styles.firstLevelLink} aria-expanded={firstItem.id == firstCategory}>
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
                onKeyDown={(key: KeyboardEvent): void => {openSecondLevelKeyboard(key, secondItem._id.secondCategory);}}
                className={styles.secondLevelBtn}
                aria-expanded={!!secondItem.isOpened}
              >
                {secondItem._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variantsThirdParent}
                initial={ secondItem.isOpened ? 'visible' : 'hidden' }
                animate={ secondItem.isOpened ? 'visible' : 'hidden' }
                className={cn(styles.thirdLevelBlock)}
              >
                {buildThirdLevel(secondItem.pages, firstItem.route, secondItem?.isOpened)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  }

  function buildThirdLevel(pages: PageItem[], route: string, isOpened?: boolean): JSX.Element {
    isOpened = isOpened ?? false;

    return (
      <>
        {pages.map(page => (
          <motion.li
            variants={ variantsThirdChildren }
            key={page._id}
            className={cn(styles.thirdLevelItem, {
              [styles.thirdLevelItemActive]: router.asPath == `/${route}/${page.alias}`
            })}
          >
            <Link href={`/${route}/${page.alias}`}>
              <a
                className={styles.thirdLevelLink}
                tabIndex={isOpened ? 0 : -1}
                aria-current={router.asPath == `/${route}/${page.alias}` ? 'page' : false}
              >
                {page.category}
              </a>
            </Link>
          </motion.li>
        ))}
      </>
    );
  }

  return (
    <nav role='navigation' className={styles.menu}>
      {announce && <span className="visuallyHidden" role='log'>{announce == 'closed' ? 'свернуто' : 'развернуто'}</span>}
      {renderFirstLevel(firstCategory)}
    </nav>
  );
};

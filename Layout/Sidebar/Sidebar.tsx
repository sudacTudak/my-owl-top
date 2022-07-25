import Link from "next/link";

import { SidebarProps } from "./Sidebar.props";
import { Menu } from "../Menu/Menu";
import Logo from '../Logo.svg';
import styles from './Sidebar.module.scss';
import cn from "classnames";
import { Search } from "../../components";

export const Sidebar = ({ className, ...props}: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Link href='/'>
        <a className={styles.logo} aria-label="Перейти на домашнюю страницу">
          <Logo/>
        </a>
      </Link>
      <Search className={styles.search}/>
      <Menu/>
    </div>
  );
};

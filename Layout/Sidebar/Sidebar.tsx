import { SidebarProps } from "./Sidebar.props";
import { Menu } from "../Menu/Menu";
import Logo from '../Logo.svg';
import styles from './Sidebar.module.scss';
import cn from "classnames";

export const Sidebar = ({ className, ...props}: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <div className={styles.logo}><Logo/></div>
      <div className={styles.search}>Поиск</div>
      <Menu/>
    </div>
  );
};

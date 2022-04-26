import { HeaderProps } from "./Header.props";
import styles from './Header.module.scss';
import { Menu } from "../Menu/Menu";

export const Header = ({...props}: HeaderProps): JSX.Element => {
  return (
    <header {...props}>
      <Menu/>
    </header>
  );
};

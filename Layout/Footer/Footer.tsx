import { FooterProps } from "./Footer.props";
import styles from './Footer.module.scss';

export const Footer = ({...props}: FooterProps): JSX.Element => {
  return (
    <footer {...props}>
      Footer
    </footer>
  );
};

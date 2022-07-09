import { DividerProps } from "./Divider.props";
import styles from './Divider.module.scss';
import cn from "classnames";

export const Divider = ({className, ...props}: DividerProps):JSX.Element => {
  return (
    <div className={cn(className, styles.divider)} {...props}/>
  );
};

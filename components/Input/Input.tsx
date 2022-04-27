import { InputProps } from "./Input.props";
import cn from "classnames";
import styles from './Input.module.scss';

export const Input = ({className, ...props }: InputProps ): JSX.Element => {
  return (
    <input className={cn(className, styles.input)} {...props}/>
  );
};

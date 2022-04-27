import { TextAreaProps } from "./TextArea.props";
import cn from "classnames";
import styles from './TextArea.module.scss';

export const TextArea = ({className, ...props }: TextAreaProps ): JSX.Element => {
  return (
    <textarea className={ cn(className, styles.textarea) } {...props}/>
  );
};

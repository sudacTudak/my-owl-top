import { TextAreaProps } from "./TextArea.props";
import cn from "classnames";
import styles from './TextArea.module.scss';
import { ForwardedRef, forwardRef } from "react";

export const TextArea = forwardRef(({className, error, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement> ): JSX.Element => {
  return (
    <div className={cn(styles.textareaWrapper, className)}>
      <textarea className={ cn(styles.textarea, {
        [styles.error]: error
      })}
      ref={ref}
      {...props}/>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});

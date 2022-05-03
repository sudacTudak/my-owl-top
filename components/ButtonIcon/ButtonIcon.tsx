import { ButtonIconProps, btnIcons } from "./ButtonIcon.props";
import styles from './ButtonIcon.module.scss';
import cn from "classnames";

export const ButtonIcon = ({appearance, icon, className, ...props}: ButtonIconProps): JSX.Element => {
  const CurrentIcon = btnIcons[icon];

  return (
    <button
      className={cn(className, styles.button, {
        [styles.primary]: appearance == 'primary',
        [styles.white]: appearance == 'white'
      })}
      {...props}
    >
      <CurrentIcon/>
    </button>
  );
};

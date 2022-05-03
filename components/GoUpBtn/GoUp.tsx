import { GoUpProps } from "./GoUp.props";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import styles from './GoUp.module.scss';
import cn from "classnames";
import { useScrollY } from "../../hooks/useScrollY";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export const GoUp = ({className, ...props}: GoUpProps): JSX.Element => {
  const scrollY = useScrollY();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({opacity: scrollY / document.body.scrollHeight});
  }, [scrollY, controls]);

  function scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  return (
    <motion.div
      className={cn(className, styles.goUp)}
      {...props}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon
        appearance='primary'
        icon='arrowUp'
        onClick={scrollToTop}
      />
    </motion.div>
  );
};

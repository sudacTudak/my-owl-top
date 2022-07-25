import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import styles from './GoUp.module.scss';
import cn from "classnames";
import { useScrollY } from "../../hooks/useScrollY";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export const GoUp = (): JSX.Element => {
  const scrollY = useScrollY();
  const controls = useAnimation();

  useEffect(() => {
    if (scrollY < document.body.scrollHeight / 4 && scrollY < 250) {
      controls.start({ opacity: 0 });
    } else {
      controls.start({ opacity: (scrollY + window.innerHeight + 250) / document.body.scrollHeight });
    }
  }, [scrollY, controls]);

  function scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  return (
    <motion.div
      className={cn(styles.goUp)}
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

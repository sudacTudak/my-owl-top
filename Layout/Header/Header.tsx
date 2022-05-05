import { HeaderProps } from "./Header.props";
import cn from "classnames";
import Logo from '../Logo.svg';
import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from './Header.module.scss';

export const Header = ({className, ...props}: HeaderProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const btnAnimVars = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    }
  };

  const menuAnimVars = {
    closed: {
      opacity: 0,
      x: '100%',
    },
    opened: {
      opacity: 1,
      x: 0,
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  return (
    <header className={cn(className, styles.header)} {...props}>
      <div className={styles.logo}>
        <Logo/>
      </div>
      <AnimatePresence initial={false} exitBeforeEnter>
        { isMenuOpen ? (
            <motion.div
              className={styles.btnClose}
              key='close'
              variants={btnAnimVars}
              initial='hidden'
              animate={isMenuOpen ? 'visible' : 'hidden'}
              exit={'hidden'}
            >
              <ButtonIcon appearance='white' icon='close' onClick={() => setIsMenuOpen(false)}/>
            </motion.div>
          ) : (
            <motion.div
              className={styles.btnOpen}
              key='open'
              variants={btnAnimVars}
              initial='hidden'
              animate={isMenuOpen ? 'hidden' : 'visible'}
              exit={'hidden'}
            >
              <ButtonIcon appearance='white' icon='burger' onClick={() => setIsMenuOpen(true)}/>
            </motion.div>
          )
        }
      </AnimatePresence>
      <motion.div
        className={styles.menuWrap}
        variants={menuAnimVars}
        initial='closed'
        animate={isMenuOpen ? 'opened' : 'closed'}
      >
        <Sidebar className={styles.menuContent}/>
      </motion.div>
    </header>
  );
};

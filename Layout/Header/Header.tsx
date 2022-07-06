import { HeaderProps } from "./Header.props";
import cn from "classnames";
import Logo from '../Logo.svg';
import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDisableScroll } from "../../hooks/useDisableScroll";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from './Header.module.scss';
import Link from "next/link";

export const Header = ({className, ...props}: HeaderProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [disableScroll, enableScroll] = useDisableScroll();
  const router = useRouter();
  const shouldReducedMotion = useReducedMotion();

  const btnAnimVars = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: shouldReducedMotion ? 0 : 0.3
      }
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: shouldReducedMotion ? 0 : 0.3
      }
    }
  };

  const menuAnimVars = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: shouldReducedMotion ? 0 : 0.3
      }
    },
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReducedMotion ? 0 : 0.3
      }
    }
  };

  useEffect(() => {
      if (isMenuOpen) {
        disableScroll();
      } else {
        setTimeout(() => {
          enableScroll();
        }, 300);
      }
  }, [isMenuOpen, disableScroll, enableScroll]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  return (
    <header className={cn(className, styles.header)}
      {...props}
    >
      <Link href='/'>
        <a className={styles.logo}>
          <Logo/>
        </a>
      </Link>
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

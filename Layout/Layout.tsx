import { LayoutProps } from "./Layout.props";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import styles from './Layout.module.scss';
import { FunctionComponent, KeyboardEvent, useRef, useState } from "react";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { GoUp } from "../components/GoUpBtn/GoUp";
import cn from "classnames";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  function skipToContent(key: KeyboardEvent): void {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
      setIsSkipLinkDisplayed(false);
    }
    if (key.code == 'Tab') {
      setIsSkipLinkDisplayed(false);
    }
  }
  return (
    <div className={styles.wrapper}>
      <a
        tabIndex={1}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed
        })}
        onFocus={() => {setIsSkipLinkDisplayed(true);}}
        onKeyDown={skipToContent}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header}/>
      <Sidebar className={styles.sidebar}/>
      <main className={styles.main} ref={bodyRef} tabIndex={0}>
        {children}
      </main>
      <Footer className={styles.footer}/>
      <GoUp/>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent (props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props}/>
        </Layout>
      </AppContextProvider>
    );
  };
};

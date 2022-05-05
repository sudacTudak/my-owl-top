import { LayoutProps } from "./Layout.props";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import styles from './Layout.module.scss';
import { FunctionComponent } from "react";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { GoUp } from "../components/GoUpBtn/GoUp";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header}/>
      <Sidebar className={styles.sidebar}/>
      <main className={styles.main}>
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

import { LayoutProps } from "./Layout.props";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import styles from './Layout.module.scss';
import { FunctionComponent } from "react";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className='wrapper'>
      <div className="content">
        <Header/>
        <div>
          <Sidebar/>
          <main>
            {children}
          </main>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent (props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props}/>
      </Layout>
    );
  };
};

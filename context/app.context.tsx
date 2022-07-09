import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { TopLevelCategory } from '../interfaces/page.interface';
import { MenuItem } from '../interfaces/menu.interface';

export interface IAppContext {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
  menu: [],
  firstCategory: TopLevelCategory.Courses
});

export const AppContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<IAppContext>): JSX.Element => {
  const [menuState, setMenuState] = useState<MenuItem[]>([]);
  const setMenu = (newMenu: MenuItem[]): void => {
    setMenuState(newMenu);
  };

  useEffect(() => {
    setMenuState(menu);
  }, [menu]);

  return (
    <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
      {children}
    </AppContext.Provider>
  );
};

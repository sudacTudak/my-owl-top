import { ChangeEvent, KeyboardEvent, MouseEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import { Input } from "..";
import { Button } from "..";
import { AppContext } from "../../context/app.context";
import { SearchProps } from "./Search.props";
import styles from './Search.module.scss';
import MagnifierIcon from './magnifier.svg';

export const Search = ( {className }: SearchProps): JSX.Element => {
  const [searchState, setSearchState] = useState<string>('');
  const {firstCategory} = useContext(AppContext);
  const router = useRouter();

  function completeSearch(e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLButtonElement>): void {
    e.preventDefault();
    const query = searchState.toLowerCase().trim();

    if (query) {
      router.push({
        pathname: '/search',
        query: {
          q: query,
          category: firstCategory,
        }
      });
    }
  }

  function keyHandler(e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLButtonElement>): void {
    if (e.key == 'Enter') {
      completeSearch(e);
    }
  }

  return (
    <form className={cn(className, styles.search)} role='search'>
      <div className={styles.wrapper}>
        <Input
          value={searchState}
          className={styles.input}
          placeholder='Поиск...'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {setSearchState(e.target.value);}}
          onKeyDown={keyHandler}
        />
        <Button
          appearance='primary'
          className={styles.btn}
          onClick={completeSearch}
          onKeyDown={keyHandler}
          aria-label='Искать по сайту'
        >
          <MagnifierIcon/>
        </Button>
      </div>
    </form>
  );
};

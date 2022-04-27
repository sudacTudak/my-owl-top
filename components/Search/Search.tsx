import { SearchProps } from "./Search.props";
import cn from "classnames";
import MagnifierIcon from './magnifier.svg';
import styles from './Search.module.scss';
import { Input } from "..";
import { Button } from "..";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";

export const Search = ( {className, ...props}: SearchProps): JSX.Element => {
  const [searchState, setSearchState] = useState<string>('');
  const router = useRouter();

  function completeSearch(): void {
    router.push({
      pathname: '/search',
      query: {
        q: searchState
      }
    });
  }

  function keyHandler(e: KeyboardEvent): void {
    if (e.key == 'Enter') {
      completeSearch();
    }
  }

  return (
    <div className={cn(className, styles.search)}>
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
        >
          <MagnifierIcon/>
        </Button>
      </div>
    </div>
  );
};

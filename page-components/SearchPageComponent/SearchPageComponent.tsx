import { ThirdCategoryLink, GoBackBtn } from "../../components";
import { SearchPageComponentProps } from "./SearchPageComponent.props";
import styles from './SearchPageComponent.module.scss';

export const SearchPageComponent = ({ searchedPages, router }: SearchPageComponentProps): JSX.Element => {
  return (
    <div className="container">
      <GoBackBtn className={styles.goBack}/>
      <div className={styles.resultStr}>
        {
          searchedPages.length > 0
            ? `По запросу "${router.query.q}" найдено ${searchedPages.length} страниц`
            : `По запросу "${router.query.q}" ничего не найдено`
        }
      </div>
      <ul className={styles.pagesList}>
        {
          searchedPages.length > 0 && searchedPages.map(( page)  => (
            <li
              key={page._id}
              className={styles.searchItem}
            >
              <ThirdCategoryLink title={page.title} alias={page.alias} category={page.category}/>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

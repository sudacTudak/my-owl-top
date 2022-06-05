import { Htag, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.scss';
import { HhData } from "../../components";
import { Advantages } from "../../components";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { Sort } from "../../components";
import { SortType } from "../../components/Sort/Sort.props";
import { useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";
import { Product } from "../../components/Product/Product";
import { declOfNum } from "../../helpers/helpers";
import { useReducedMotion } from "framer-motion";

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortType.Rating });
  const shouldReducedMotion = useReducedMotion();

  function changeSort(type: SortType): void {
    dispatchSort({ type });
  }

  useEffect(() => {
    dispatchSort( {type: 'reset', initialProducts: products} );
  }, [products]);

  return (
    <>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Htag tag='h1' className={styles.titlePage}>{page.title}</Htag>
            {products && <Tag color="gray" size="medium" aria-label={products.length + declOfNum(products.length, ['элемент','элемента','элементов'])}>{products.length}</Tag>}
          </div>
          <div className={styles.headerRight}>
            <Sort currentSort={sort} setSort={changeSort}/>
          </div>
        </div>
        <ul className={styles.productsList}>
          {sortedProducts && sortedProducts.map(product => (
            <li key={product._id} className={styles.productsItem}>
              <Product layout={shouldReducedMotion ? false : true} product={product} />
            </li>
          ))}
        </ul>
        {firstCategory === TopLevelCategory.Courses && page.hh && <section className={styles.hh}>
          <div className={styles.hhHeader}>
            <Htag tag='h2' className={styles.titleHh}>Вакансии - {page.category}</Htag>
            <Tag size='medium' color='red'>hh.ru</Tag>
          </div>
          <HhData {...page.hh}/>
        </section>
        }
        {page.advantages && page.advantages.length > 0 && <section className={styles.advantages}>
          <Htag tag='h2' className={styles.advantagesTitle}>Преимущества</Htag>
          <Advantages advantages={page.advantages}/>
        </section>}
        {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={ {__html: page.seoText} }/>}
        <section className={styles.skills} style={{display: 'none'}}>
          <Htag tag='h2' className={styles.titleSkills}>Получаемые навыки</Htag>
          <ul className={styles.skillsList}>
            {page.tags.map(tag => (
              <li className={styles.skillsItem} key={tag}>
                <Tag  color='primary'>{tag.toUpperCase()}</Tag>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

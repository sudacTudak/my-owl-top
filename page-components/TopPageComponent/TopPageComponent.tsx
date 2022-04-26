import { Htag, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.scss';
import { HhData } from "../../components/HhData/HhData";
import { Advantages } from "../../components/Advantages/Advantages";
import { TopLevelCategory } from "../../interfaces/page.interface";

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {
  return (
    <>
      <div className="container">
        <div className={styles.header}>
          <Htag tag='h1' className={styles.titlePage}>{page.title}</Htag>
          {products && <Tag color="gray" size="medium">{products.length}</Tag>}
        </div>
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
        <section className={styles.skills}>
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

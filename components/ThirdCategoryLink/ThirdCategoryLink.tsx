import { ThirdCategoryLinkProps } from "./ThirdCategoryLink.props";
import styles from './ThirdCategoryLink.module.scss';
import { Tag } from "../Tag/Tag";
import Link from "next/link";
import { Htag } from "../HTag/Htag";
import { Card } from "../Card/Card";

export const ThirdCategoryLink = ({ alias, category, title }: ThirdCategoryLinkProps): JSX.Element => {
  return (
    <Card color="blue" className={styles.card}>
      <div className={styles.wrapper}>
        <div  className={styles.mainColumn}>
          <Htag tag="h3" className={styles.title}>{title}</Htag>
          <Tag
            color="gray"
            size="small"
            className={styles.tag}
          >
            {category}
          </Tag>
        </div>
        <div className={styles.subColumn}>
          <Link href={`/courses/${alias}`}>
            <a className={styles.link}>Перейти</a>
          </Link>
        </div>
      </div>
    </Card>
  );
}

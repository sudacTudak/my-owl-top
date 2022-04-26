import { Htag, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.scss';

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {
  return (
    <>
      <div className={styles.header}>
        <Htag tag='h1' >{page.title}</Htag>
        {products && <Tag color="gray" size="medium">{products.length}</Tag>}
      </div>
    </>
  );
};

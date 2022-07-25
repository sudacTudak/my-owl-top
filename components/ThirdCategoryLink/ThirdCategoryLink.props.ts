import { TopLevelCategory } from '../../interfaces/page.interface';
import { ThirdCategoryItem } from '../../interfaces/thirdCategoryLink.interface';

export interface ThirdCategoryLinkProps extends Omit<ThirdCategoryItem, '_id'> {
  firstCategory: TopLevelCategory;
}

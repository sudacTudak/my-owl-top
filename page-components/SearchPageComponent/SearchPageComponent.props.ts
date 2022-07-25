import { NextRouter } from 'next/router';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { ThirdCategoryItem } from '../../interfaces/thirdCategoryLink.interface';

export interface SearchPageComponentProps {
  searchedPages: ThirdCategoryItem[];
  router: NextRouter;
  firstCategory: TopLevelCategory;
}

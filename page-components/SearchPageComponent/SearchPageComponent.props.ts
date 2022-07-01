import { NextRouter } from 'next/router';
import { ThirdCategoryItem } from '../../interfaces/thirdCategoryLink.interface';

export interface SearchPageComponentProps {
  searchedPages: ThirdCategoryItem[];
  router: NextRouter;
}

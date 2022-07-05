import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/page.interface';

export interface TypePageComponentProps {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}

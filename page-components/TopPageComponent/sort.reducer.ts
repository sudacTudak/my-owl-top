import { SortType } from '../../components/Sort/Sort.props';
import { ProductModel } from '../../interfaces/product.interface';

export type SortActions = { type: SortType.Price } | { type: SortType.Rating} | {type: 'reset', initialProducts: ProductModel[]};

export interface SortReducerState {
  sort: SortType;
  products: ProductModel[];
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
  switch (action.type) {
    case SortType.Rating:
      return {
        sort: SortType.Rating,
        products: state.products.sort( (a, b) => b.initialRating - a.initialRating )
      };
    case SortType.Price:
      return {
        sort: SortType.Price,
        products: state.products.sort( (a, b) => b.price - a.price )
      };
    case 'reset':
      return {
        sort: SortType.Rating,
        products: action.initialProducts
      };
    default:
      throw new Error('Неверный тип сортировки');
  }
};

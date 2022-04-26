import { SortType } from '../../components/Sort/Sort.props';
import { ProductModel } from '../../interfaces/product.interface';

export type SortActions = { type: SortType.Price } | { type: SortType.Rating};

export interface SortReducerState {
  sort: SortType;
  products: ProductModel[];
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
  switch (action.type) {
    case SortType.Rating:
      return {
        sort: SortType.Rating,
        products: state.products.sort( (a, b) => a.initialRating - b.initialRating)
      };
    case SortType.Price:
      return {
        sort: SortType.Price,
        products: state.products.sort( (a, b) => a.price - b.price)
      };
    default:
      throw new Error('Неверный тип сортировки');
  }
};

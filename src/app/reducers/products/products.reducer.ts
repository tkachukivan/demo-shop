import { Action, createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { ProductModel } from 'src/app/models/product.model';


export interface State {
  products: ProductModel[];
  loaded: boolean;
  loading: boolean;
  total: number;
}

export const initialState: State = {
  products: [],
  loaded: false,
  loading: false,
  total: 0,
};

const productsReducer = createReducer(
  initialState,
  on(ProductsActions.productsRequest, (state) => ({ ...state, loading: true })),
  on(ProductsActions.productsLoaded, (state, { products, total }) => ({ ...state, products, loaded: true, loading: false, total })),
  on(ProductsActions.productsRequestOnScroll, (state) => ({ ...state, loading: true })),
  on(ProductsActions.productsLoadedOnScroll, (state, { products }) => ({
    ...state,
    products: [...state.products, ...products],
    loading: false
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}

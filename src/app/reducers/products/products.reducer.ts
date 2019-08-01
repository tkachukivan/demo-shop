import { Action, createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { ProductModel } from 'src/app/models/product.model';


export interface State {
  products: ProductModel[];
  loaded: boolean;
}

export const initialState: State = {
  products: [],
  loaded: false,
};

const productsReducer = createReducer(
  initialState,
  on(ProductsActions.productsLoaded, (state, { products }) => ({ ...state, products, loaded: true}))
);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}

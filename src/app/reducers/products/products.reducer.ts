import { Action, createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { ProductModel } from 'src/app/models/product.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';


export interface State {
  products: ProductModel[];
  productsLoaded: boolean;
  categoriesLoaded: boolean;
  loading: boolean;
  total: number;
  categories: ProductCategoryModel[];
  currentProduct: ProductModel;
}

export const initialState: State = {
  products: [],
  productsLoaded: false,
  categoriesLoaded: false,
  loading: false,
  total: 0,
  categories: [],
  currentProduct: null
};

const productsReducer = createReducer(
  initialState,
  on(ProductsActions.productsRequest, (state) => ({ ...state, loading: true })),
  on(ProductsActions.productsLoaded, (state, { products, total }) => ({
    ...state,
    products: [...state.products, ...products],
    loading: false,
    productsLoaded: true,
    total,
  })),
  on(ProductsActions.resetProductsList, (state) => ({ ...state, products: [] })),
  on(ProductsActions.productsCategoriesLoaded, (state, { categories }) => ({...state, categories, categoriesLoaded: true })),
  on(ProductsActions.productDelete, (state, { productId }) => ({
    ...state,
    products: state.products.filter( p => p.id !== productId),
    total: state.total - 1,
  })),
  on(ProductsActions.setCurrentProduct, (state, product) => ({...state, currentProduct: product })),
  on(ProductsActions.buyProduct, (state, { id, count, soldCount }) => ({
    ...state,
    products: state.products.map( p => {
      if (p.id === id) {
        return {
          ...p,
          count,
          soldCount,
        };
      }
      return p;
    }),
    currentProduct: {
      ...state.currentProduct,
      count,
      soldCount,
    }
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}

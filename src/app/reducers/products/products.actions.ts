import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';

export const PRODUCTS_REQUEST = '[Products Page] Products Request';
export const PRODUCTS_LOADED = '[Products Page] Products Loaded';

export interface IProductsLoaded {
  products: ProductModel[];
}

export const productsRequest = createAction(
  PRODUCTS_REQUEST,
);

export const productsLoaded = createAction(
  PRODUCTS_LOADED,
  props<IProductsLoaded>()
);


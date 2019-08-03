import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';

export const PRODUCTS_REQUEST = '[Products Page] Products Request';
export const PRODUCTS_LOADED = '[Products Page] Products Loaded';
export const PRODUCTS_REQUEST_ON_SCROLL = '[Products Page] Products Request On Scroll';
export const PRODUCTS_LOADED_ON_SCROLL = '[Products Page] Products Loaded On Scroll';

export interface IProductsLoaded {
  products: ProductModel[];
  total: number;
}

export interface IProductsRequestOnScroll {
  page: number;
}

export const productsRequest = createAction(
  PRODUCTS_REQUEST,
);

export const productsLoaded = createAction(
  PRODUCTS_LOADED,
  props<IProductsLoaded>()
);

export const productsRequestOnScroll = createAction(
  PRODUCTS_REQUEST_ON_SCROLL,
  props<IProductsRequestOnScroll>()
);

export const productsLoadedOnScroll = createAction(
  PRODUCTS_LOADED_ON_SCROLL,
  props<IProductsLoaded>()
);


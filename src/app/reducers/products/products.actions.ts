import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';
import { ProductFiltersModel } from 'src/app/models/product-filters.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';

export const PRODUCTS_REQUEST = '[Products Page] Products Request';
export const PRODUCTS_LOADED = '[Products Page] Products Loaded';
export const PRODUCTS_REQUEST_ON_SCROLL = '[Products Page] Products Request On Scroll';
export const PRODUCTS_LOADED_ON_SCROLL = '[Products Page] Products Loaded On Scroll';
export const PRODUCTS_CATEGORIES_REQUEST = '[Products Page] Products Categories Request';
export const PRODUCTS_CATEGORIES_LOADED = '[Products Page] Products Categories Loaded';

export interface IProductsLoaded {
  products: ProductModel[];
  total: number;
}

export interface IProductsCategoriesLoaded {
  categories: ProductCategoryModel[];
}

export const productsRequest = createAction(
  PRODUCTS_REQUEST,
  props<ProductFiltersModel>()
);

export const productsLoaded = createAction(
  PRODUCTS_LOADED,
  props<IProductsLoaded>()
);

export const productsRequestOnScroll = createAction(
  PRODUCTS_REQUEST_ON_SCROLL,
  props<ProductFiltersModel>()
);

export const productsLoadedOnScroll = createAction(
  PRODUCTS_LOADED_ON_SCROLL,
  props<IProductsLoaded>()
);

export const productsCategoriesRequest = createAction(
  PRODUCTS_CATEGORIES_REQUEST,
);

export const productsCategoriesLoaded = createAction(
  PRODUCTS_CATEGORIES_LOADED,
  props<IProductsCategoriesLoaded>()
);

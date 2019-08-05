import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';
import { ProductFiltersModel } from 'src/app/models/product-filters.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';

export const PRODUCTS_REQUEST = '[Products Page] Products Request';
export const PRODUCTS_LOADED = '[Products Page] Products Loaded';
export const RESET_PRODUCTS_LIST = '[Products Page] Reset Products List';
export const PRODUCTS_CATEGORIES_REQUEST = '[Products Page] Products Categories Request';
export const PRODUCTS_CATEGORIES_LOADED = '[Products Page] Products Categories Loaded';
export const PRODUCT_DELETE_REQUEST = '[Products Page] Products Delete Request';
export const PRODUCT_DELETE = '[Products Page] Products Delete';

export interface IProductsLoaded {
  products: ProductModel[];
  total: number;
}

export interface IProductsCategoriesLoaded {
  categories: ProductCategoryModel[];
}

export interface IProductsDelete {
  productId: number;
  filters?: ProductFiltersModel;
}

export const productsRequest = createAction(
  PRODUCTS_REQUEST,
  props<ProductFiltersModel>()
);

export const productsLoaded = createAction(
  PRODUCTS_LOADED,
  props<IProductsLoaded>()
);

export const resetProductsList = createAction(
  RESET_PRODUCTS_LIST,
)

export const productsCategoriesRequest = createAction(
  PRODUCTS_CATEGORIES_REQUEST,
);

export const productsCategoriesLoaded = createAction(
  PRODUCTS_CATEGORIES_LOADED,
  props<IProductsCategoriesLoaded>()
);

export const productDeleteRequest = createAction(
  PRODUCT_DELETE_REQUEST,
  props<IProductsDelete>()
);

export const productDelete = createAction(
  PRODUCT_DELETE,
  props<IProductsDelete>()
);

import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';
import { ProductFiltersModel } from 'src/app/models/product-filters.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { IUpdateProduct } from 'src/app/services/products.service';

export const PRODUCTS_REQUEST = '[Products Page] Products Request';
export const PRODUCTS_LOADED = '[Products Page] Products Loaded';
export const RESET_PRODUCTS_LIST = '[Products Page] Reset Products List';
export const PRODUCTS_CATEGORIES_REQUEST = '[Products Page] Products Categories Request';
export const PRODUCTS_CATEGORIES_LOADED = '[Products Page] Products Categories Loaded';
export const PRODUCT_DELETE_REQUEST = '[Products Page] Products Delete Request';
export const PRODUCT_DELETE = '[Products Page] Products Delete';
export const SET_CURRENT_PRODUCT = '[Product Details Page] Set Current Product';
export const BUY_PRODUCT_REQUEST = '[Product Details Page] Buy Product Request';
export const BUY_PRODUCT = '[Product Details Page] Buy Product';
export const CREATE_PRODUCT_REQUEST = '[Product Details Page] Create Product Request';
export const CREATE_PRODUCT = '[Product Details Page] Create Product';
export const UPDATE_PRODUCT_REQUEST = '[Product Details Page] Update Product Request';
export const UPDATE_PRODUCT = '[Product Details Page] Update Product';
export const UPDATE_PRODUCT_COUNT_REQUEST = '[Product Details Page] Update Product Count Request';

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
  fromProductDetailsPage?: boolean;
}

export interface IBuyProduct {
  id: number;
  count: number;
  soldCount: number;
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
);

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

export const setCurrentProduct = createAction(
  SET_CURRENT_PRODUCT,
  props<{ product: ProductModel }>()
);

export const buyProductRequest = createAction(
  BUY_PRODUCT_REQUEST,
  props<IBuyProduct>()
);
export const buyProduct = createAction(
  BUY_PRODUCT,
  props<IBuyProduct>()
);

export const createProductRequest = createAction(
  CREATE_PRODUCT_REQUEST,
  props<{ product: ProductModel }>()
);

export const createProduct = createAction(
  CREATE_PRODUCT,
  props<{ product: ProductModel }>()
);

export const updateProductRequest = createAction(
  UPDATE_PRODUCT_REQUEST,
  props<{ product: IUpdateProduct }>()
);

export const updateProduct = createAction(
  UPDATE_PRODUCT,
  props<{ product: IUpdateProduct }>()
);

export const updateProductCountRequest = createAction(
  UPDATE_PRODUCT_COUNT_REQUEST,
  props<{ product: IUpdateProduct }>()
);

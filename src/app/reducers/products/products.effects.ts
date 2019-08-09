import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import * as LoginActions from '../login/login.actions';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { ProductFiltersModel } from 'src/app/models/product-filters.model';
import { Action } from '@ngrx/store';
import { ProductsService, IUpdateProduct } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductModel } from 'src/app/models/product.model';

@Injectable()
export class ProductsEffects {
  productsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.PRODUCTS_REQUEST),
    switchMap((filters: ProductFiltersModel) => {
      return this.productService.loadProducts(filters)
        .pipe(
          map((response) => {
            return ProductsActions.productsLoaded({
              products: response.body,
              total: Number(response.headers.get('X-Total-Count'))
            });
          }),
          catchError(this.errorHandler)
        );
    })
  ));

  productsCategoryRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.PRODUCTS_CATEGORIES_REQUEST),
    switchMap(() => {
      return this.productService.loadProductsCategories()
        .pipe(
          map((categories: ProductCategoryModel[]) => ProductsActions.productsCategoriesLoaded({ categories })),
          catchError(this.errorHandler)
        );
    })
  ));

  productDeleteRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.PRODUCT_DELETE_REQUEST),
    switchMap(( action: ProductsActions.IProductsDelete & Action) => {
      return this.productService.deleteProduct(action.productId)
        .pipe(
          switchMap(() => {
            const actions = [
              ProductsActions.productDelete({ productId: action.productId }),
              ProductsActions.productsRequest(action.filters)
            ];
            if (!action.filters) {
              actions.pop();
            }

            if (action.fromProductDetailsPage) {
              this.router.navigate(['/']);
            }
            return actions;
          }),
          catchError(this.errorHandler)
        );
    }),
  ));

  buyProductRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.BUY_PRODUCT_REQUEST),
    switchMap((action: ProductsActions.IBuyProduct & Action) => {
      const fieldsToUpdate = { ...action };
      delete fieldsToUpdate.type;

      return this.productService.updateProduct(fieldsToUpdate)
        .pipe(
          map(() => ProductsActions.buyProduct(fieldsToUpdate)),
          catchError(this.errorHandler)
        );
    })
  ));

  createProductRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.CREATE_PRODUCT_REQUEST),
    switchMap((action: { product: ProductModel }) => {
      return this.productService.createProduct(action.product)
        .pipe(
          map((product: ProductModel) => {
            this.router.navigate(['/product', product.id]);
            return ProductsActions.createProduct({ product });
          }),
          catchError(this.errorHandler)
        );
    })
  ));

  updateProductRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.UPDATE_PRODUCT_REQUEST),
    switchMap((action: { product: IUpdateProduct }) => {
      return this.productService.updateProduct(action.product)
        .pipe(
          map(() => {
            this.location.back();
            return ProductsActions.updateProduct({ product: action.product } );
          }),
          catchError(this.errorHandler)
        );
    })
  ));

  updateProductCountRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.UPDATE_PRODUCT_COUNT_REQUEST),
    switchMap((action: { product: IUpdateProduct }) => {
      return this.productService.updateProduct(action.product)
        .pipe(
          map(() => {
            return ProductsActions.updateProduct({ product: action.product } );
          }),
          catchError(this.errorHandler)
        );
    })
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductsService,
    private router: Router,
    private location: Location
  ) { }

  errorHandler(error) {
    if (error.status === 401) {
      return of(LoginActions.logout());
    }

    return EMPTY;
  }
}

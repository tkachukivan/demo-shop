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
            return actions;
          }),
          catchError(this.errorHandler)
        );
    }),
  ));

  buyProductsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.BUY_PRODUCT_REQUEST),
    switchMap((action: IUpdateProduct) => {
      const fieldsToUpdate = {
        id: action.id,
        count: action.count,
        soldCount: action.soldCount,
      };

      return this.productService.updateProduct(fieldsToUpdate)
        .pipe(
          map(() => ProductsActions.buyProduct(fieldsToUpdate)),
          catchError(this.errorHandler)
        );
    })
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) { }

  errorHandler(error) {
    if (error.status === 401) {
      return of(LoginActions.logout());
    }

    return EMPTY;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import * as LoginActions from '../login/login.actions';
import { API_ROOT, PRODUCTS, CATEGORIES } from 'src/app/constants/endpoints';
import { ProductModel } from 'src/app/models/product.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { ProductFiltersModel } from 'src/app/models/product-filters.model';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductsEffects {
  productsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.PRODUCTS_REQUEST),
    switchMap(this.loadProducts(ProductsActions.productsLoaded))
  ));

  productsCategoryRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.PRODUCTS_CATEGORIES_REQUEST),
    switchMap(() => {
      return this.http.get(
        `${API_ROOT}${CATEGORIES}`
      ).pipe(
        map((categories: ProductCategoryModel[]) => ProductsActions.productsCategoriesLoaded({ categories })),
        catchError(this.errorHandler)
      );
    })
  ));

  productDeleteRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.PRODUCT_DELETE_REQUEST),
    switchMap(( action: ProductsActions.IProductsDelete & Action) => {
      return this.http.delete(
        `${API_ROOT}${PRODUCTS}/${action.productId}`
      ).pipe(
        switchMap(() => {
          const actions = [ProductsActions.productDelete({ productId: action.productId }), ProductsActions.productsRequest(action.filters)];
          if (!action.filters) {
            actions.pop();
          }
          return actions;
        }),
        catchError(this.errorHandler)
      );
    }),
  ));

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) { }

  loadProducts(action) {
    return (filters: ProductFiltersModel) => {
      let params = new HttpParams();

      Object.keys(filters).forEach((filterName) => {
        if (!filters[filterName] || filterName === 'type') {
          return;
        }

        switch (filterName) {
          case 'page':
            params = params.set('_page', String(filters.page));
            break;
          case 'limit':
            params = params.set('_limit', String(filters.limit));
            break;
          case 'search':
            params = params.set('q', filters.search);
            break;
          case 'cost':
            if (filters.cost.from) {
              params = params.set(`${filterName}_gte`, String(filters.cost.from));
            }

            if (filters.cost.to) {
              params = params.set(`${filterName}_lte`, String(filters.cost.to));
            }

            break;
          case 'availableOnly':
            params = params.set('count_gte', String(1));
            break;
          default:
            params = params.set(filterName, String(filters[filterName]));
        }
      });

      return this.http.get<ProductModel[]>(
        `${API_ROOT}${PRODUCTS}`,
        {
          observe: 'response',
          params,
        }
      )
        .pipe(
          map((response) => {
            return action({
              products: response.body,
              total: Number(response.headers.get('X-Total-Count'))
            });
          }),
          catchError(this.errorHandler)
        );
    };
  }

  errorHandler(error) {
    if (error.status === 401) {
      return of(LoginActions.logout());
    }

    return EMPTY;
  }
}

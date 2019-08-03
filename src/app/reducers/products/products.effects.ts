import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import { API_ROOT, PRODUCTS } from 'src/app/constants/endpoints';
import { ProductModel } from 'src/app/models/product.model';

@Injectable()
export class ProductsEffects {
  productsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.PRODUCTS_REQUEST),
    switchMap(this.loadProducts(ProductsActions.productsLoaded))
  ));

  productsRequestOnScroll$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.PRODUCTS_REQUEST_ON_SCROLL),
    switchMap(this.loadProducts(ProductsActions.productsLoadedOnScroll))
  ));

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) { }

  loadProducts(action) {
    return ({ page = 1 }) => {
      return this.http.get<ProductModel[]>(
        `${API_ROOT}${PRODUCTS}`,
        {
          observe: 'response',
          params: new HttpParams().set('_page', String(page)).set('_limit', '6')
        }
      )
        .pipe(
          map((response) => {
            return action({
              products: response.body,
              total: Number(response.headers.get('X-Total-Count'))
            });
          }),
          catchError(() => EMPTY)
        );
    };
  }
}

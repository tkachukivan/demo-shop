import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import { API_ROOT, PRODUCTS } from 'src/app/constants/endpoints';
import { ProductModel } from 'src/app/models/product.model';

@Injectable()
export class ProductsEffects {
  productsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.PRODUCTS_REQUEST),
    switchMap(() => {
      return this.http.get(
        `${API_ROOT}${PRODUCTS}`
      )
        .pipe(
          map((products: ProductModel[]) => {
            return ProductsActions.productsLoaded({ products });
          }),
          catchError(() => EMPTY)
        );
    })
  ));

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) { }
}

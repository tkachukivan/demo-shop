import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { productsRequest } from '../reducers/products/products.actions';
import { take, tap, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsPageResolver implements Resolve<boolean> {
  constructor(
    private store: Store<AppState>,
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.store.select('products')
      .pipe(
        take(1),
        tap(({ loaded }) => {
          if (!loaded) {
            this.store.dispatch(productsRequest());
          }
        }),
        filter(({ loaded }) => loaded),
        map(({ loaded }) => loaded)
      );
  }
}

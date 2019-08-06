import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { productsRequest, productsCategoriesRequest } from '../reducers/products/products.actions';
import { take, filter, map } from 'rxjs/operators';
import { ProductFiltersModel } from '../models/product-filters.model';

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
    this.initLoading();

    return this.waitForData();
  }

  initLoading() {
    this.store.select('products')
      .pipe(
        take(1),
      ).subscribe(({ productsLoaded, categoriesLoaded }) => {
        if (!productsLoaded) {
          this.store.dispatch(productsRequest(new ProductFiltersModel()));
        }
        if (!categoriesLoaded) {
          this.store.dispatch(productsCategoriesRequest());
        }
      });
  }

  waitForData() {
    return this.store.select('products')
      .pipe(
        filter(({ productsLoaded, categoriesLoaded }) => productsLoaded && categoriesLoaded),
        map(() => true),
        take(1),
      );
  }
}

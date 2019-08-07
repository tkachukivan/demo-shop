import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { setCurrentProduct } from '../reducers/products/products.actions';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { selectProductById } from '../reducers/products/products.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsResolver implements Resolve<Observable<boolean>> {
  constructor(
    private store: Store<AppState>,
    private productsService: ProductsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const id = route.params.id;

    if (id === 'new') {
      this.store.dispatch(setCurrentProduct({ product: new ProductModel() }));
      return of(true);
    }

    return this.store
      .pipe(
        take(1),
        map((appState) => selectProductById(appState, { id: Number(id) })),
        switchMap((product: ProductModel) => {
          if (product) {
            return of(product);
          }
          return this.productsService.loadProductById(Number(id));
        }),
        tap((product) => {
          this.store.dispatch(setCurrentProduct({ product }));
        }),
        map(() => of(true))
      );
  }
}

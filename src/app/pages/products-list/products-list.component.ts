import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public products: ProductModel[];
  private storeSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('products')
      .subscribe((productsStore) => {
        this.products = productsStore.products;
      });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}

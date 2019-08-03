import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';
import { AppState } from 'src/app/reducers';
import { productsRequestOnScroll } from 'src/app/reducers/products/products.actions';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public products: ProductModel[];
  public isInfiniteScrollActive = false;
  private currentPage = 1;
  private storeSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('products')
      .subscribe(({ products, total, loading }) => {
        this.products = products;
        this.isInfiniteScrollActive = products.length < total && !loading;
      });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  loadDocuments() {
    console.log('111');
    if (this.isInfiniteScrollActive) {
      this.currentPage++;
      this.store.dispatch(productsRequestOnScroll({ page: this.currentPage }));
    }
  }
}

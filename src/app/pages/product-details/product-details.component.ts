import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { ProductModel } from 'src/app/models/product.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { buyProductRequest } from 'src/app/reducers/products/products.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public storeSub: Subscription;
  public product: ProductModel;
  public productCategory: ProductCategoryModel;
  public isBuyProductModalOpen = false;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('products')
      .subscribe(({ currentProduct, categories }) => {
        this.product = currentProduct;
        this.productCategory = categories.find(c => c.id === this.product.categoryId);
      });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  onBuyProductClick() {
    this.store.dispatch(buyProductRequest({
      id: this.product.id,
      count: this.product.count - 1,
      soldCount: this.product.soldCount + 1
    }));
    this.isBuyProductModalOpen = true;
  }

  onBuyProductModalClose() {
    this.isBuyProductModalOpen = false;
  }
}

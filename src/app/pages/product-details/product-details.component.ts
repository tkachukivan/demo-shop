import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { ProductModel } from 'src/app/models/product.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { buyProductRequest, productDeleteRequest } from 'src/app/reducers/products/products.actions';
import { Role } from 'src/app/enums';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private storeProductsSub: Subscription;
  private storeLoginSub: Subscription;
  public product: ProductModel;
  public productCategory: ProductCategoryModel;
  public isBuyProductModalOpen = false;
  public isAdmin = false;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.storeProductsSub = this.store.select('products')
      .subscribe(({ currentProduct, categories }) => {
        this.product = currentProduct;
        if (this.product) {
          this.productCategory = categories.find(c => c.id === this.product.categoryId);
        }
      });
    this.storeLoginSub = this.store.select('login')
      .subscribe(({ roleId }) => {
        this.isAdmin = roleId === Role.Admin;
      });
  }

  ngOnDestroy() {
    this.storeProductsSub.unsubscribe();
    this.storeLoginSub.unsubscribe();
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

  onProductDelete(productId: number) {
    this.store.dispatch(productDeleteRequest( { productId, fromProductDetailsPage: true }));
  }
}

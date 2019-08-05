import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';
import { AppState } from 'src/app/reducers';
import { productsRequestOnScroll, productsRequest, productDeleteRequest } from 'src/app/reducers/products/products.actions';
import { ProductFiltersModel } from 'src/app/models/product-filters.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { Role } from 'src/app/enums';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public products: ProductModel[];
  public categories: ProductCategoryModel[];
  public isInfiniteScrollActive = false;
  public roleId: Role;
  private filters = new ProductFiltersModel();
  private storeProductsSub: Subscription;
  private storeUserSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.storeProductsSub = this.store.select('products')
      .subscribe(({ products, total, loading, categories }) => {
        this.products = products;
        this.categories = categories;
        this.isInfiniteScrollActive = products.length < total && !loading;
      });

    this.storeUserSub = this.store.select('login')
      .subscribe(({ roleId }) => {
        this.roleId = roleId;
      });
  }

  ngOnDestroy() {
    this.storeProductsSub.unsubscribe();
    this.storeUserSub.unsubscribe();
  }

  onSearchChange(search: string) {
    this.filters = {
      ...this.filters,
      search,
      page: 1
    };

    this.updateProductsList();
  }

  onFiltersChanged(filters: ProductFiltersModel) {
    this.filters = {
      ...filters,
      search: this.filters.search,
      page: 1,
    };

    this.updateProductsList();
  }

  onProductDelete(productId: number) {
    this.store.dispatch(productDeleteRequest({ productId }));
  }

  updateProductsList() {
    this.store.dispatch(productsRequest(this.filters));
  }

  loadDocuments() {
    if (this.isInfiniteScrollActive) {
      this.filters.page++;
      this.store.dispatch(productsRequestOnScroll(this.filters));
    }
  }
}

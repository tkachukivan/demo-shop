import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';
import { AppState } from 'src/app/reducers';
import { resetProductsList, productsRequest, productDeleteRequest, IProductsDelete } from 'src/app/reducers/products/products.actions';
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
  public isAdmin: boolean;
  private total: number;
  private filters = new ProductFiltersModel();
  private storeProductsSub: Subscription;
  private storeUserSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.storeProductsSub = this.store.select('products')
      .subscribe(({ products, total, loading, categories }) => {
        this.total = total;
        this.products = products;
        this.categories = categories;
        this.isInfiniteScrollActive = products.length < total && !loading;
      });

    this.storeUserSub = this.store.select('login')
      .subscribe(({ roleId }) => {
        this.isAdmin = roleId === Role.Admin;
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
    const actionPayload: IProductsDelete = { productId };
    if (this.total > this.products.length) {
      actionPayload.filters = { ...this.filters, page: this.filters.limit * this.filters.page, limit: 1 };
    }
    this.store.dispatch(productDeleteRequest(actionPayload));
  }

  updateProductsList() {
    this.store.dispatch(resetProductsList());
    this.store.dispatch(productsRequest(this.filters));
  }

  loadDocuments() {
    if (this.isInfiniteScrollActive) {
      this.filters.page++;
      this.store.dispatch(productsRequest(this.filters));
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product.model';
import { AppState } from 'src/app/reducers';
import { productsRequestOnScroll, productsRequest } from 'src/app/reducers/products/products.actions';
import { ProductFiltersModel } from 'src/app/models/product-filters.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public products: ProductModel[];
  public categories: ProductCategoryModel[];
  public isInfiniteScrollActive = false;
  private filters = new ProductFiltersModel();
  private storeSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('products')
      .subscribe(({ products, total, loading, categories }) => {
        this.products = products;
        this.categories = categories;
        this.isInfiniteScrollActive = products.length < total && !loading;
      });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductFiltersModel } from '../models/product-filters.model';
import { ProductModel } from '../models/product.model';
import { API_ROOT, PRODUCTS, CATEGORIES } from '../constants/endpoints';

export interface IUpdateProduct {
  id: number;
  categoryId?: number;
  image?: string;
  name?: string;
  description?: string;
  cost?: number;
  rating?: number;
  gender?: string;
  count?: number;
  soldCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient
  ) { }

  loadProducts(filters: ProductFiltersModel) {
    let params = new HttpParams();

    Object.keys(filters).forEach((filterName) => {
      if (!filters[filterName] || filterName === 'type') {
        return;
      }

      switch (filterName) {
        case 'page':
          params = params.set('_page', String(filters.page));
          break;
        case 'limit':
          params = params.set('_limit', String(filters.limit));
          break;
        case 'search':
          params = params.set('q', filters.search);
          break;
        case 'cost':
          if (filters.cost.from) {
            params = params.set(`${filterName}_gte`, String(filters.cost.from));
          }

          if (filters.cost.to) {
            params = params.set(`${filterName}_lte`, String(filters.cost.to));
          }

          break;
        case 'availableOnly':
          params = params.set('count_gte', String(1));
          break;
        default:
          params = params.set(filterName, String(filters[filterName]));
      }
    });

    return this.http.get<ProductModel[]>(
      `${API_ROOT}${PRODUCTS}`,
      {
        observe: 'response',
        params,
      }
    );
  }

  loadProductById(productId: number) {
    return this.http.get<ProductModel>(
      `${API_ROOT}${PRODUCTS}/${productId}`
    );
  }

  deleteProduct(productId: number) {
    return this.http.delete(
      `${API_ROOT}${PRODUCTS}/${productId}`
    );
  }

  updateProduct(product: IUpdateProduct) {
    return this.http.patch<ProductModel>(
      `${API_ROOT}${PRODUCTS}/${product.id}`,
      product
    );
  }

  loadProductsCategories() {
    return this.http.get(
      `${API_ROOT}${CATEGORIES}`
    );
  }
}

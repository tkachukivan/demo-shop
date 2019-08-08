import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ProductModel } from 'src/app/models/product.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { updateProductRequest, createProductRequest } from 'src/app/reducers/products/products.actions';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
})
export class EditProductModalComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  public product: ProductModel;
  public categories: ProductCategoryModel[];
  public isNewProduct: boolean;
  public productForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('products')
      .subscribe(({ currentProduct, categories }) => {
        this.product = currentProduct;
        this.categories = categories;
        this.isNewProduct = this.product.id === null;
        this.productForm = this.initProductEditForm();
      });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  getModalTitle() {
    return this.isNewProduct ? 'Create New Product' : `Edit ${this.product.name}`;
  }

  initProductEditForm() {
    return this.fb.group({
      name: [this.product.name, [Validators.required]],
      categoryId: [this.product.categoryId, [Validators.required]],
      gender: [this.product.gender, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      image: [this.product.image, [Validators.required]],
      cost: [this.product.cost, [Validators.required]],
      rating: [this.product.rating, [Validators.required]]
    });
  }

  onCancel() {
    if (this.isNewProduct) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onProductSave() {
    if (this.productForm.invalid) {
      return;
    }

    if (this.isNewProduct) {
      this.store.dispatch(createProductRequest({ product: { ...this.product, ...this.productForm.value } }));
      return;
    }

    this.store.dispatch(updateProductRequest({ product: { id: this.product.id, ...this.productForm.value } }));
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ProductModel } from 'src/app/models/product.model';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Gender } from 'src/app/enums';

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
  public ratingValues = [1, 2, 3, 4, 5];
  public genders = Object.values(Gender);

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

  get productName() {
    return this.productForm.get('name');
  }

  get productDescription() {
    return this.productForm.get('description');
  }

  getModalTitle() {
    return this.isNewProduct ? 'Create New Product' : `Edit ${this.product.name}`;
  }

  onImageLoadError() {
    this.productForm.get('image').setErrors({ invalidLink: true });
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
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}

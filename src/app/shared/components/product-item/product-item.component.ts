import { Component, Input, HostBinding, Output, EventEmitter, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { Role } from 'src/app/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() product: ProductModel;
  @Input() isAdmin: boolean;
  @Input() isExtendedView: boolean;
  @Output() deleteProduct = new EventEmitter<number>();
  @Output() buyProduct = new EventEmitter();
  @Output() countUpdate = new EventEmitter<number>();
  @HostBinding('class.product-item') cssClass = true;
  @HostBinding('class.product-item--extended-view') isExteded = false;

  public isDeleteModalOpen = false;
  public updateCountForm: FormGroup;
  private countFieldSub: Subscription;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.isExteded = this.isExtendedView;
    this.updateCountForm = this.fb.group({
      count: [this.product.count, Validators.required],
    });

    this.countFieldSub = this.countField.valueChanges
      .subscribe((value) => {
        if (value < 0) {
          this.countField.setValue(0);
        }
      });
  }

  ngOnChanges() {
    if (this.updateCountForm) {
      this.countField.setValue(this.product.count);
    }
  }

  ngOnDestroy() {
    this.countFieldSub.unsubscribe();
  }

  get countField() {
    return this.updateCountForm.get('count');
  }

  onBuyProductClick() {
    this.buyProduct.emit();
  }

  onDeleteProduct() {
    this.isDeleteModalOpen = true;
  }

  onDeleteModalClose(result) {
    this.isDeleteModalOpen = false;
    if (result) {
      this.deleteProduct.emit(this.product.id);
    }
  }

  updateCount() {
    this.countUpdate.emit(this.updateCountForm.value.count);
  }
}

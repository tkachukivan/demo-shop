import { Component, Input, HostBinding, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { Role } from 'src/app/enums';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  @Input() product: ProductModel;
  @Input() isAdmin: boolean;
  @Input() isExtendedView: boolean;
  @Output() deleteProduct = new EventEmitter<number>();
  @Output() buyProduct = new EventEmitter();
  @HostBinding('class.product-item') cssClass = true;
  @HostBinding('class.product-item--extended-view') isExteded = false;

  public isDeleteModalOpen = false;

  constructor() { }

  ngOnInit() {
    this.isExteded = this.isExtendedView;
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
}

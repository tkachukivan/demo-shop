import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { Role } from 'src/app/enums';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input() product: ProductModel;
  @Input() isAdmin: boolean;
  @Output() deleteProduct = new EventEmitter<number>();
  @HostBinding('attr.class') cssClass = 'product-item';

  constructor() { }

  onDeleteProduct() {
    this.deleteProduct.emit(this.product.id);
  }
}

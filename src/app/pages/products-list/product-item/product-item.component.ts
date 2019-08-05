import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { Role } from 'src/app/enums';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input() product: ProductModel;
  @Input() userRole: Role;
  @Output() deleteProduct = new EventEmitter<number>();
  @HostBinding('class') class = 'product-item';
  public rolesEnum = Role;

  constructor() { }

  onDeleteProduct() {
    this.deleteProduct.emit(this.product.id);
  }
}

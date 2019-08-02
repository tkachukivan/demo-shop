import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  @Input() product: ProductModel;
  @HostBinding('class') class = 'product-item';

  constructor() { }

  ngOnInit() {
  }

}

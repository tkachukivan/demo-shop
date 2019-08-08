import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryComponent {
  @HostBinding('attr.class') cssClass = 'product-edit-modal-section';
  @Input() categories: ProductCategoryModel[];
  @Input() parent: FormGroup;

  constructor() {}

  get category() {
    return this.parent.get('description');
  }
}

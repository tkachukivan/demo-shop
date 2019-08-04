import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesFilterComponent {
  @HostBinding('class') class = 'filter-form-group-item';
  @Input() categories: ProductCategoryModel[];
  @Input() parent: FormGroup;

  constructor() { }
}

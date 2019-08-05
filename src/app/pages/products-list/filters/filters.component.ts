import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { ProductFiltersModel } from 'src/app/models/product-filters.model';
import { FormBuilder } from '@angular/forms';
import { Role } from 'src/app/enums';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  @Input() categories: ProductCategoryModel[];
  @Input() isAdmin: boolean;
  @Output() filterChanged = new EventEmitter<ProductFiltersModel>();

  public isFiltersOpen = false;
  public filtersForm = this.initFiltersForm();

  @HostListener('document:click', ['$event'])
  onOutOfFiltersClick(event) {
    if (!event.target.closest('app-filters') && this.isFiltersOpen) {
      this.isFiltersOpen = false;
    }
  }

  constructor(
    private fb: FormBuilder
  ) { }

  initFiltersForm() {
    return this.fb.group({
      availableOnly: [false],
      gender: [null],
      categoryId: [''],
      rating: [null],
      priceFrom: [null],
      priceTo: [null]
    });
  }

  toggleFilters() {
    this.isFiltersOpen = !this.isFiltersOpen;
  }

  applyFilters() {
    this.filterChanged.emit(new ProductFiltersModel(this.filtersForm.value));
  }
}

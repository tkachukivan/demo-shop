import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsListComponent } from './products-list.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { AvailabilityFilterComponent } from './filters/availability-filter/availability-filter.component';
import { CategoriesFilterComponent } from './filters/categories-filter/categories-filter.component';
import { GenderFilterComponent } from './filters/gender-filter/gender-filter.component';
import { PriceFilterComponent } from './filters/price-filter/price-filter.component';
import { RatingFilterComponent } from './filters/rating-filter/rating-filter.component';



@NgModule({
  declarations: [
    ProductsListComponent,
    SearchComponent,
    FiltersComponent,
    AvailabilityFilterComponent,
    CategoriesFilterComponent,
    GenderFilterComponent,
    PriceFilterComponent,
    RatingFilterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    ProductsListComponent
  ]
})
export class ProductsListModule { }

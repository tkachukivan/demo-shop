import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { BuyProductModalComponent } from './buy-product-modal/buy-product-modal.component';
import { EditProductModalComponent } from './edit-product-modal/edit-product-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditNameComponent } from './edit-product-modal/edit-name/edit-name.component';
import { EditCategoryComponent } from './edit-product-modal/edit-category/edit-category.component';
import { EditGenderComponent } from './edit-product-modal/edit-gender/edit-gender.component';
import { EditDescriptionComponent } from './edit-product-modal/edit-description/edit-description.component';
import { EditImageComponent } from './edit-product-modal/edit-image/edit-image.component';
import { EditPriceComponent } from './edit-product-modal/edit-price/edit-price.component';
import { EditRatingComponent } from './edit-product-modal/edit-rating/edit-rating.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    BuyProductModalComponent,
    EditProductModalComponent,
    EditNameComponent,
    EditCategoryComponent,
    EditGenderComponent,
    EditDescriptionComponent,
    EditImageComponent,
    EditPriceComponent,
    EditRatingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductDetailsModule { }

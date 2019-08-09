import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { DeleteProductConfirmationComponent } from '../shared/components/delete-product-confirmation/delete-product-confirmation.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalComponent,
    InfiniteScrollDirective,
    ProductItemComponent,
    DeleteProductConfirmationComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    ModalComponent,
    InfiniteScrollDirective,
    ProductItemComponent,
    FooterComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }

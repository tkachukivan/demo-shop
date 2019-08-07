import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { DeleteProductConfirmationComponent } from '../shared/components/delete-product-confirmation/delete-product-confirmation.component';

@NgModule({
  declarations: [
    ModalComponent,
    InfiniteScrollDirective,
    ProductItemComponent,
    DeleteProductConfirmationComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    ModalComponent,
    InfiniteScrollDirective,
    ProductItemComponent,
  ]
})
export class SharedModule { }

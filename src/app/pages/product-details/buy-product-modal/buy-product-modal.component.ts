import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buy-product-modal',
  templateUrl: './buy-product-modal.component.html',
})
export class BuyProductModalComponent {
  @Input() isOpen: boolean;
  @Output() closeModal = new EventEmitter();
  constructor() { }

  onModalClose() {
    this.closeModal.emit();
  }
}

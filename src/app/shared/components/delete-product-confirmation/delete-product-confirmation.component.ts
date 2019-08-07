import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-delete-product-confirmation',
  templateUrl: './delete-product-confirmation.component.html',
})
export class DeleteProductConfirmationComponent {
  @Input() isOpen: boolean;
  @Output() closeModal = new EventEmitter<boolean>();

  constructor() { }

  onCancel() {
    this.closeModal.emit(false);
  }

  onSubmit() {
    this.closeModal.emit(true);
  }

}

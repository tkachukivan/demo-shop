import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditNameComponent {
  @HostBinding('attr.class') cssClass = 'product-edit-modal-section';
  @Input() parent: FormGroup;
  constructor() { }

  onNameChanged() {
    const trimedValue = this.productName.value.trim();
    if (trimedValue !== this.productName.value) {
      this.productName.setValue(trimedValue);
    }
  }

  get productName() {
    return this.parent.get('name');
  }
}

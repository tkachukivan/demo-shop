import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-description',
  templateUrl: './edit-description.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDescriptionComponent {
  @HostBinding('attr.class') cssClass = 'product-edit-modal-section';
  @Input() parent: FormGroup;
  constructor() { }

  onDescriptionChanged() {
    const trimedValue = this.description.value.trim();
    if (trimedValue !== this.description.value) {
      this.description.setValue(trimedValue);
    }
  }

  get description() {
    return this.parent.get('description');
  }
}

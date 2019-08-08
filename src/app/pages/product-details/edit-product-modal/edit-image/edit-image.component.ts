import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditImageComponent {
  @HostBinding('attr.class') cssClass = 'product-edit-modal-section';
  @Input() parent: FormGroup;
  constructor() { }

  get image() {
    return this.parent.get('image');
  }

  onImageLoadError() {
    this.image.setErrors({ invalidLink: true });
  }
}

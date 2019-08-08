import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRatingComponent {
  @HostBinding('attr.class') cssClass = 'product-edit-modal-section';
  @Input() parent: FormGroup;
  public ratingValues = [0, 1, 2, 3, 4, 5];

  constructor() { }

  get rating() {
    return this.parent.get('rating');
  }
}

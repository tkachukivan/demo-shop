import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Gender } from 'src/app/enums';

@Component({
  selector: 'app-edit-gender',
  templateUrl: './edit-gender.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditGenderComponent {
  @HostBinding('attr.class') cssClass = 'product-edit-modal-section';
  @Input() parent: FormGroup;
  public genders = Object.values(Gender);

  constructor() { }

  get gender() {
    return this.parent.get('gender');
  }
}

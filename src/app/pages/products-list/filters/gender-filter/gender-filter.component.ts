import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Gender } from 'src/app/enums';

@Component({
  selector: 'app-gender-filter',
  templateUrl: './gender-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderFilterComponent {
  @HostBinding('attr.class') cssClass = 'filter-form-group-item';
  @Input() parent: FormGroup;
  public genders = Object.values(Gender);
  constructor() { }
}

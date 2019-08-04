import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-availability-filter',
  templateUrl: './availability-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailabilityFilterComponent {
  @HostBinding('class') class = 'filter-form-group-item';
  @Input() parent: FormGroup;

  constructor() { }
}

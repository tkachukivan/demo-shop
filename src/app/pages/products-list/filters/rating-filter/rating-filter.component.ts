import { Component, OnInit, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rating-filter',
  templateUrl: './rating-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingFilterComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'filter-form-group-item filter-form-group-item--col-1';
  @Input() parent: FormGroup;
  constructor() { }

  ngOnInit() {
    this.rating.valueChanges.subscribe(
      (value) => {
        if (value > 5) {
          this.rating.setValue(5);
        } else if (value !== null && value < 1) {
          this.rating.setValue(1);
        }
      }
    );
  }

  get rating() {
    return this.parent.get('rating');
  }
}

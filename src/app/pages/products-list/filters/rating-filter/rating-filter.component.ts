import { Component, OnInit, ChangeDetectionStrategy, HostBinding, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rating-filter',
  templateUrl: './rating-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingFilterComponent implements OnInit, OnDestroy {
  @HostBinding('attr.class') cssClass = 'filter-form-group-item filter-form-group-item--col-1';
  @Input() parent: FormGroup;
  private ratingSub: Subscription;
  constructor() { }

  ngOnInit() {
    this.ratingSub = this.rating.valueChanges.subscribe(
      (value) => {
        if (value > 5) {
          this.rating.setValue(5);
        } else if (value !== null && value < 0) {
          this.rating.setValue(0);
        }
      }
    );
  }

  ngOnDestroy() {
    this.ratingSub.unsubscribe();
  }

  get rating() {
    return this.parent.get('rating');
  }
}

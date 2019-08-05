import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceFilterComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'filter-form-group-item filter-form-group-item--col-2';
  @Input() parent: FormGroup;
  constructor() { }

  ngOnInit() {
    this.priceFrom.valueChanges.subscribe(
      (value) => {
        if (this.priceTo.value && value > this.priceTo.value) {
          this.priceFrom.setValue(this.priceTo.value);
        }
      }
    );

    this.priceTo.valueChanges.subscribe(
      (value) => {
        if (value < this.priceFrom.value) {
          this.priceFrom.setValue(this.priceFrom.value);
        }
      }
    );
  }

  get priceFrom() {
    return this.parent.get('priceFrom');
  }

  get priceTo() {
    return this.parent.get('priceTo');
  }

}

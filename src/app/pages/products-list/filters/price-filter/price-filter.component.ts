import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceFilterComponent implements OnInit, OnDestroy {
  @HostBinding('attr.class') cssClass = 'filter-form-group-item filter-form-group-item--col-2';
  @Input() parent: FormGroup;
  private priceFromSub: Subscription;
  private priceToSub: Subscription;
  constructor() { }

  ngOnInit() {
    this.priceFromSub = this.priceFrom.valueChanges.subscribe(
      (value) => {
        if (this.priceTo.value && value > this.priceTo.value) {
          this.priceFrom.setValue(this.priceTo.value);
        }
      }
    );

    this.priceToSub = this.priceTo.valueChanges.subscribe(
      (value) => {
        if (value < this.priceFrom.value) {
          this.priceFrom.setValue(this.priceFrom.value);
        }
      }
    );
  }

  ngOnDestroy() {
    this.priceFromSub.unsubscribe();
    this.priceToSub.unsubscribe();
  }

  get priceFrom() {
    return this.parent.get('priceFrom');
  }

  get priceTo() {
    return this.parent.get('priceTo');
  }

}

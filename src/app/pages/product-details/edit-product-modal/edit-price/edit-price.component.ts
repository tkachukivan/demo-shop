import { Component, OnInit, ChangeDetectionStrategy, HostBinding, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPriceComponent implements OnInit, OnDestroy {
  @HostBinding('attr.class') cssClass = 'product-edit-modal-section';
  @Input() parent: FormGroup;
  private priceSub: Subscription;
  constructor() { }

  ngOnInit() {
    this.priceSub = this.price.valueChanges
      .subscribe((value) => {
        if (value < 0) {
          this.price.setValue(null);
        }
      });
  }

  ngOnDestroy() {
    this.priceSub.unsubscribe();
  }

  get price() {
    return this.parent.get('cost');
  }
}

import { Component, OnInit, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPriceComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'product-edit-modal-section';
  @Input() parent: FormGroup;
  constructor() { }

  ngOnInit() {
    this.price.valueChanges
      .subscribe((value) => {
        if (value < 0) {
          this.price.setValue(null);
        }
      });
  }

  get price() {
    return this.parent.get('cost');
  }
}

import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'filters__search';
  @Output() searchChange = new EventEmitter<string>();

  public onSearchInput = new Subject<string>();
  constructor() { }

  ngOnInit() {
    this.onSearchInput.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchChange.emit(value);
    });
  }
}

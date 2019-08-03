import { Directive, OnInit, OnDestroy, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, OnDestroy, OnChanges {
  @Input() appInfiniteScroll: boolean;
  @Output() loadDocuments = new EventEmitter();
  private onScroll = this._onScroll.bind(this);

  constructor() { }

  ngOnInit() {
    if (this.appInfiniteScroll) {
      document.addEventListener('scroll', this.onScroll);
    }
  }

  ngOnDestroy() {
    document.removeEventListener('scroll', this.onScroll);
  }

  ngOnChanges() {
    if (this.appInfiniteScroll) {
      document.addEventListener('scroll', this.onScroll);
    } else {
      document.removeEventListener('scroll', this.onScroll);
    }
  }

  _onScroll() {
    if (window.scrollY + document.documentElement.clientHeight + 50 > document.documentElement.scrollHeight) {
      this.loadDocuments.emit();
    }
  }
}

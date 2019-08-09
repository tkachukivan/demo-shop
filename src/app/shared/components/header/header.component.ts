import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() userName: string;
  @Output() logout = new EventEmitter();
  constructor() { }

  onLogoutClick() {
    this.logout.emit();
  }
}

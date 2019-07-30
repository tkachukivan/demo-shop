import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from 'src/app/reducers';
import { autoLogin } from './reducers/login/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<State>,
  ) {}

  ngOnInit() {
    this.store.dispatch(autoLogin());
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from 'src/app/reducers';
import { logout } from 'src/app/reducers/login/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
})
export class RootComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;

  public userName = null;

  constructor(
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('login').subscribe(loginState => {
      this.userName = loginState.userName;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  logout() {
    this.store.dispatch(logout());
  }
}

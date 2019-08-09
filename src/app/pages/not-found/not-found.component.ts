import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { logoutRequest } from 'src/app/reducers/login/login.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: []
})
export class NotFoundComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  public userName: string;

  constructor(
    private store: Store<AppState>,
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
    this.store.dispatch(logoutRequest({ userName: this.userName }));
  }
}

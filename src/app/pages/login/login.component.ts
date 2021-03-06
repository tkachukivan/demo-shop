import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginFormModel } from 'src/app/models/login-form.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { loginRequest } from 'src/app/reducers/login/login.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;

  public userLoginForm: LoginFormModel = new LoginFormModel();
  public isLoading = false;
  public isLoginFailed = false;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('login').subscribe(loginState => {
      this.isLoading = loginState.loading;
      this.isLoginFailed = loginState.loginError;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch(loginRequest({ ...this.userLoginForm }));
  }
}

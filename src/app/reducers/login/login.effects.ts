import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as LoginActions from './login.actions';

@Injectable()
export class LoginEffects {

  @Effect()
  loginRequest$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.LOGIN_REQUEST_ACTION),
    switchMap((action: LoginActions.ILoginRequest) => {
      return this.http.post(
        'https://limitless-ridge-76594.herokuapp.com/api/login',
        {
          login: action.login,
          password: action.password,
        }
      )
        .pipe(
          map((userData: LoginActions.ILoginUser) => {
            localStorage.setItem('userData', JSON.stringify(userData));
            return LoginActions.login(userData);
          }),
          catchError(() => of(LoginActions.loginError()))
        );
    })
  ));

  @Effect({ dispatch: false })
  loginRedirect = this.actions$.pipe(
    ofType(LoginActions.LOGIN_ACTION),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType(LoginActions.LOGOUT_ACTION),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(LoginActions.AUTO_LOGIN),
    map(() => {
      const userData: LoginActions.ILoginUser = JSON.parse(localStorage.getItem('userData'));

      if (userData) {
        return LoginActions.login(userData);
      }

      return {type: 'EMPTY'};
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) { }
}

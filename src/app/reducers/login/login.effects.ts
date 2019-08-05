import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as LoginActions from './login.actions';
import { API_ROOT, LOGIN, LOGOUT } from 'src/app/constants/endpoints';
import { Action } from '@ngrx/store';

@Injectable()
export class LoginEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => LoginActions.autoLogin())
    )
  );

  loginRequest$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.LOGIN_REQUEST_ACTION),
    switchMap((action: LoginActions.ILoginRequest) => {
      return this.http.post(
        `${API_ROOT}${LOGIN}`,
        {
          login: action.login,
          password: action.password,
        }
      )
        .pipe(
          map((userData: LoginActions.ILoginUser) => {
            localStorage.setItem('userData', JSON.stringify(userData));
            userData.redirect = true;
            return LoginActions.login(userData);
          }),
          catchError(() => of(LoginActions.loginError()))
        );
    })
  ));

  loginRedirect = createEffect( () => this.actions$.pipe(
      ofType(LoginActions.LOGIN_ACTION),
      tap((action: LoginActions.ILoginUser & Action) => {
        if (action.redirect) {
          this.router.navigate(['/']);
        }
      })
    ),
    { dispatch: false }
  );

  logoutRequest = createEffect( () => this.actions$.pipe(
    ofType(LoginActions.LOGOUT_REQUEST_ACTION),
    switchMap((logoutRequest: LoginActions.ILogoutRequest & Action) => {
      return this.http.post(
        `${API_ROOT}${LOGOUT}`, { login: logoutRequest.userName },
        { responseType: 'text' }
      )
        .pipe(
          map(() => LoginActions.logout()),
          catchError(() => of({ type: 'EMPTY' }))
        );
    })
  ));

  logout = createEffect( () => this.actions$.pipe(
      ofType(LoginActions.LOGOUT_ACTION),
      tap(() => {
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  autoLogin = createEffect( () => this.actions$.pipe(
    ofType(LoginActions.AUTO_LOGIN),
    map(() => {
      const userData: LoginActions.ILoginUser = JSON.parse(localStorage.getItem('userData'));

      if (userData) {
        userData.redirect = false;
        return LoginActions.login(userData);
      }

      return { type: 'EMPTY' };
    })
  ));

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) { }
}

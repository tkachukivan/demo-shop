import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AppState } from '../reducers';

@Injectable({ providedIn: 'root' })
export class LoginPageGuard implements CanActivate {
  constructor(
    private store: Store<AppState>
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      map(loginState => {
        if (loginState.sessionToken) {
          return false;
        }

        return true;
      })
    );
  }
}

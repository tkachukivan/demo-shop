import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<State>,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('login')
      .pipe(
        take(1),
        exhaustMap(loginState => {
          if (!loginState.sessionToken) {
            return next.handle(req);
          }

          const modifiedReq = req.clone({
            headers: req.headers.set('session-token', loginState.sessionToken)
          });

          return next.handle(modifiedReq);
        })
      );
  }
}

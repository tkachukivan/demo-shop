import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromLogin from './login/login.reducer';
import * as fromProducts from './products/products.reducer';

export interface AppState {
  login: fromLogin.State;
  products: fromProducts.State;
}

export const reducers: ActionReducerMap<AppState> = {
  login: fromLogin.reducer,
  products: fromProducts.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

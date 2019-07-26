import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromLogin from './login/login.reducer';

export interface State {
  login: fromLogin.State;
}

export const reducers: ActionReducerMap<State> = {
  login: fromLogin.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

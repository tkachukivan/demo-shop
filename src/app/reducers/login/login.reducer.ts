import { Action, createReducer, on } from '@ngrx/store';
import * as LoginPageActions from './login.actions';

export interface State {
    userName: string;
    sessionToken: string;
    roleId: Role;
    loading: boolean;
    loginError: boolean;
}

export const initialState: State = {
    userName: null,
    sessionToken: null,
    roleId: null,
    loading: false,
    loginError: false,
};

const loginReducer = createReducer(
    initialState,
    on(LoginPageActions.loginRequest, (state) => ({...state, loading: true, loginError: false})),
    on(LoginPageActions.login, (state, {userName, sessionToken, roleId}) => ({ ...state, userName, sessionToken, roleId, loading: false })),
    on(LoginPageActions.loginError, (state) => ({...state, loading: false, loginError: true})),
    on(LoginPageActions.logout, state => ({ ...state, ...initialState })),
);

export function reducer(state: State | undefined, action: Action) {
    return loginReducer(state, action);
}

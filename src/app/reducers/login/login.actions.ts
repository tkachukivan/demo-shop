import { createAction, props } from '@ngrx/store';

export const LOGIN_REQUEST_ACTION = '[Login Page] Login Request';
export const LOGIN_ACTION = '[Login Page] Login';
export const LOGIN_ERROR = '[Login Page] Login Error';
export const LOGOUT_ACTION = '[Header Component] Logout';

export interface ILoginRequest {
    login: string;
    password: string;
}

export interface ILoginRequestAction {
    type: string;
    login: string;
    password: string;
}

export interface ILoginUser {
    userName: string;
    sessionToken: string;
    roleId: Role;
}

export interface ILoginUserAction {
    type: string;
    userName: string;
    sessionToken: string;
    roleId: Role;
}

export const loginRequest = createAction(
    LOGIN_REQUEST_ACTION,
    props<ILoginRequest>()
);

export const login = createAction(
    LOGIN_ACTION,
    props<ILoginUser>()
);

export const loginError = createAction(
    LOGIN_ERROR
);

export const logout = createAction(
    LOGOUT_ACTION,
);


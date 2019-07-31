import { createAction, props } from '@ngrx/store';

export const LOGIN_REQUEST_ACTION = '[Login Page] Login Request';
export const LOGIN_ACTION = '[Login Page] Login';
export const AUTO_LOGIN = '[App Component] Auto Login';
export const LOGIN_ERROR = '[Login Page] Login Error';
export const LOGOUT_REQUEST_ACTION = '[Header Component] Logout Request';
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

export interface ILogoutRequest {
  userName: string;
}

export interface ILogoutRequestAction {
  type: string;
  userName: string;
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

export const logoutRequest = createAction(
  LOGOUT_REQUEST_ACTION,
  props<ILogoutRequest>()
);

export const logout = createAction(
  LOGOUT_ACTION,
);

export const autoLogin = createAction(
  AUTO_LOGIN,
);

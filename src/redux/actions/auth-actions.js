import AuthService from "../../core/auth.service";
import StorageService from "../../core/storage.service";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./quiz-action-types";

const authService = new AuthService();

const storageService = new StorageService();

function authResponseHandler(dispatch) {
  return response => {
    storageService.setStorage(response.data);
    dispatch(authSuccess(response.data.idToken));
    dispatch(autoLogOut(response.data.expiresIn));
  }
}

const onSignUpHandler = (data, dispatch) => {
  authService.signUp(data)
    .then(authResponseHandler(dispatch));
};

const onSignInHandler = (data, dispatch) => {
  authService.signIn(data)
    .then(authResponseHandler(dispatch));
};

export function auth(data) {
  return (dispatch) => {
    if (data.isLogin) {
      return onSignInHandler(data, dispatch)
    }
    onSignUpHandler(data, dispatch);
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token
    }
  }
}

export function autoLogOut(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut())
    }, time * 1000);
  }
}

export function logOut() {
  storageService.clearStorage();
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return (dispatch) => {
    const token = storageService.getToken();
    if (token) {
      const expirationDate = new Date(storageService.getExpirationDate());
      if (expirationDate <= new Date()) {
        return dispatch(logOut());
      }
      dispatch(authSuccess(token));
      dispatch(autoLogOut((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
    else {
      dispatch(logOut())
    }
  }
}
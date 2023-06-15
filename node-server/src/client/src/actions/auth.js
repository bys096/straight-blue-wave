import { LOGIN_SUCCESS, LOGOUT } from './types.js';

export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}
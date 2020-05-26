import { BW } from 'api';
import * as actions from '../constants';
import { UserInfo, AppStore } from 'models';

export const signInByToken = () => (dispatch, getState: () => AppStore) => {
	dispatch({ type: actions.REFRESH_TOKEN });
	const token = getState().auth.token;
	return BW.post<UserInfo>('/auth/signInByToken', { token })
		.then(userInfo => dispatch({ type: actions.REFRESH_TOKEN_SUCCESS, data: { payload: { token, userInfo } } }))
		.catch(err => dispatch({ type: actions.REFRESH_TOKEN_FAILED }));
}

export const signIn = (email: string, password: string) => dispatch => {
	dispatch({ type: actions.GET_AUTH_TOKEN });
	return BW.post<{ token: string; userInfo: UserInfo }>('/auth/signIn', { email, password })
		.then(payload => {
			dispatch({ type: actions.GET_AUTH_TOKEN_SUCCESS, data: { payload } });
		})
		.catch(error => {
			dispatch({ type: actions.GET_AUTH_TOKEN_FAILED, data: { error } });
		})
};

export const signOut = () => dispatch => {
	BW.setHeaders('Authorization', '');
	dispatch({ type: actions.DESTROY_AUTH_TOKEN });
};

export const forgetPassword = (email: string, password: string) => dispatch => {
	dispatch({ type: actions.FORGET_PASSWORD });
	return BW.post<any>('/v2/auth/forget-password', { email, password })
		.then(forget => {
			dispatch({ type: actions.FORGET_PASSWORD_SUCCESS, data: { forget } });
		})
		.catch(error => {
			dispatch({ type: actions.FORGET_PASSWORD_FAILED, data: { error } });
		})
};

export const sendForgetPasswordEmail = (email: string, domain: string) => dispatch => {
	dispatch({ type: actions.FORGET_PASSWORD_EMAIL });
	return BW.post<any>('/v2/auth/send-forget-email', { email, domain })
		.then(send => {
			dispatch({ type: actions.FORGET_PASSWORD_EMAIL_SUCCESS, data: { send } });
		})
		.catch(error => {
			dispatch({ type: actions.FORGET_PASSWORD_EMAIL_FAILED, data: { error } });
		})
};
import Cookies from 'js-cookie';
import { REHYDRATE } from 'redux-persist';
import { AuthReducer } from "../../models/store";
import * as actions from '../constants/auth';
import { BW } from 'api';

const initialState: AuthReducer = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  userInfo: null,
  forget: null,
  send: null,
  error: null
};

const auth = (state: AuthReducer = initialState, action: { type: string, payload?: any, data?: _.Dictionary<any> }): AuthReducer => {
  const { type, data } = action;
  switch (type) {
    case REHYDRATE: {
      const token = Cookies.get('token');
      if (!token) {
        return {
          ...state,
          token: null,
          userInfo: null,
          isAuthenticated: false,
          error: null
        }
      }
      BW.setHeaders('Authorization', token);
      return {
        ...state,
        token,
        userInfo: null,
        isAuthenticated: true,
        error: null
      }
    }
    case actions.GET_AUTH_TOKEN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case actions.GET_AUTH_TOKEN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: data.error
      };
    case actions.GET_AUTH_TOKEN_SUCCESS: {
      const { token, userInfo } = data.payload;
      BW.setHeaders('Authorization', token);
      Cookies.set('token', token);
      return {
        ...state,
        token,
        userInfo,
        isLoading: false,
        isAuthenticated: true,
        error: null
      };
    }
    case actions.REFRESH_TOKEN:
      return {
        ...state,
        isLoading: true,
      };
    case actions.REFRESH_TOKEN_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.REFRESH_TOKEN_SUCCESS: {
      const { userInfo } = data.payload;
      return {
        ...state,
        userInfo,
        isLoading: false,
        isAuthenticated: true,
        error: null
      };
    }
    case actions.DESTROY_AUTH_TOKEN:
      Cookies.remove('token');
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        userInfo: null,
        error: null
      }
    case actions.FORGET_PASSWORD:
      return {
        ...state,
        isLoading: true,
        forget: null
      };
    case actions.FORGET_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.FORGET_PASSWORD_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        forget: data.forget,
      };
    case actions.FORGET_PASSWORD_EMAIL:
      return {
        ...state,
        isLoading: true,
        send: null
      };
    case actions.FORGET_PASSWORD_EMAIL_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.FORGET_PASSWORD_EMAIL_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        send: data.send,
      };
    default:
      return state;
  }
}
export default auth;

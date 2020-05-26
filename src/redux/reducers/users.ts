import * as actions from '../constants/users';
import { UsersReducer } from "models";

const initialState: UsersReducer = {
  isLoading: false,
  users: [],
  user: null,
  create: null,
  edit: null
};

const users = (state: UsersReducer = initialState, action: { type: string, data?: any }): UsersReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_USERS_ORGANIZATION:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_USERS_ORGANIZATION_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_USERS_ORGANIZATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: [...data.users || []]
      };
    case actions.CREATE_USER:
      return {
        ...state,
        isLoading: true,
        create: null
      };
    case actions.CREATE_USER_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        create: data.create
      };
    case actions.EDIT_USER:
      return {
        ...state,
        isLoading: true,
        edit: null
      };
    case actions.EDIT_USER_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        edit: data.edit
      };
    case actions.GET_USER:
      return {
        ...state,
        isLoading: true,
        user: null
      };
    case actions.GET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: data.user
      };
  }
  return state;
}
export default users;
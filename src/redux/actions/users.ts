import * as actions from '../constants/users';
import { BW } from 'api';
import { UserInfo } from 'models';

export const getUsersByOrganization = (organizationId) => dispatch => {
  dispatch({ type: actions.GET_USERS_ORGANIZATION })
  BW.get<UserInfo[]>(`/users/organization/${organizationId}`)
    .then(users => {
      dispatch({ type: actions.GET_USERS_ORGANIZATION_SUCCESS, data: { users } })
    })
    .catch(error => dispatch({ type: actions.GET_USERS_ORGANIZATION_FAILED }))
}

export const createUser = (data) => dispatch => {
  dispatch({ type: actions.CREATE_USER })
  BW.post<any>(`/v2/admin/configure/user`, data)
    .then(result => {
      dispatch({ type: actions.CREATE_USER_SUCCESS, data: { create: { _id: result } } })
    })
    .catch(error => dispatch({ type: actions.CREATE_USER_FAILED }))
  }

  export const editUser = (userId, user) => dispatch => {
    dispatch({ type: actions.EDIT_USER })
    BW.post<string>(`/v2/users/update/${userId}`, user)
      .then(result => {
        let res = '';
        if (result === 'OK'){
          res = userId;
        }
        dispatch({ type: actions.EDIT_USER_SUCCESS, data: { edit: { _id: res } } })
      })
      .catch(error => dispatch({ type: actions.EDIT_USER_FAILED }))
  }

  export const getUserById = (userId) => dispatch => {
    dispatch({ type: actions.GET_USER })
    BW.get<UserInfo>(`/users/user/${userId}`)
      .then(user => {
        dispatch({ type: actions.GET_USER_SUCCESS, data: { user } })
      })
      .catch(error => dispatch({ type: actions.GET_USER_FAILED }))
  }
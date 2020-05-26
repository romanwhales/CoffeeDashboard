import * as actions from '../constants/organizations';
import { BW } from 'api';
import { BaseOrganization, BaseSingleOrganization } from 'models';

export const getOrganizations = () => dispatch => {
  dispatch({ type: actions.GET_ORGANIZATIONS });
  BW.get<BaseOrganization[]>('/cafes')
    .then(organizations => dispatch({ type: actions.GET_ORGANIZATIONS_SUCCESS, data: { organizations } }))
    .catch(error => dispatch({ type: actions.GET_ORGANIZATIONS_FAILED }))
};

export const getSingleOrganizations = cafeId => dispatch => {
  dispatch({ type: actions.GET_SINGLE_ORGANIZATIONS });
  BW.get<BaseSingleOrganization[]>(`cafes/${cafeId}`)
      .then(organization => dispatch({ type: actions.GET_SINGLE_ORGANIZATIONS_SUCCESS, data: { organization } }))
      .catch(error => dispatch({ type: actions.GET_SINGLE_ORGANIZATIONS_FAILED }))
};

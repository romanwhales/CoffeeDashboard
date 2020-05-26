import * as actions from '../constants/organizations';
import { OrganizationsReducer } from "models";

const initialState: OrganizationsReducer = {
  isLoading: false,
  organizations: [],
  cafe: null,
};

const organizations = (state: OrganizationsReducer = initialState, action: { type: string, data?: any }): OrganizationsReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_ORGANIZATIONS:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_ORGANIZATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        organizations: [...data.organizations || []]
      };
    case actions.GET_SINGLE_ORGANIZATIONS:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_SINGLE_ORGANIZATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_SINGLE_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cafe: data.organization
      };
  }
  return state;
};
export default organizations;

import * as actions from '../constants/stores';
import { StoresReducer } from "models";

const initialState: StoresReducer = {
  isLoading: false,
  stores: [],
  store: null,
  edit: null
};

const stores = (state: StoresReducer = initialState, action: { type: string, data?: any }): StoresReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_STORES_ORGANIZATION:
      return {
        ...state,
        isLoading: true,
        store: null,
        edit: null
      };
    case actions.GET_STORES_ORGANIZATION_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_STORES_ORGANIZATION_SUCCESS:
      data.stores.forEach(item => {
        item.value = item._id
        item.label = item.name
      })
      return {
        ...state,
        isLoading: false,
        stores: [...data.stores || []]
      };
    case actions.GET_STORE:
      return {
        ...state,
        isLoading: true,
        store: null,
        edit: null
      };
    case actions.GET_STORE_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_STORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        store: data.store
      };
    case actions.EDIT_STORE:
      return {
        ...state,
        isLoading: true,
        edit: null
      };
    case actions.EDIT_STORE_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.EDIT_STORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        edit: data.edit
      };
  }
  return state;
}
export default stores;

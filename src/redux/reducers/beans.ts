import * as actions from '../constants/beans';
import { BeansReducer } from "models";

const initialState: BeansReducer = {
  isLoading: false,
  beans: [],
  bean: null,
  archive: null,
  edit: null,
  create: null,
  purchase: null
};

const beans = (state: BeansReducer = initialState, action: { type: string, data?: any }): BeansReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_BEANS:
      return {
        ...state,
        isLoading: true,
        edit: null,
        create: null
      };
    case actions.GET_BEANS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_BEANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        beans: [...data.beans || []]
      };
    case actions.ARCHIVE_BEAN:
      return {
        ...state,
        isLoading: true,
        archive: null
      };
    case actions.ARCHIVE_BEAN_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.ARCHIVE_BEAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        archive: data.archive
      };
    case actions.GET_BEAN_BY_ID:
      return {
        ...state,
        isLoading: true,
        bean: null
      };
    case actions.GET_BEAN_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_BEAN_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bean: data.bean
      };
    case actions.EDIT_BEAN:
      return {
        ...state,
        isLoading: true,
        edit: null
      };
    case actions.EDIT_BEAN_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.EDIT_BEAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        edit: data.edit
      };
    case actions.CREATE_BEAN:
      return {
        ...state,
        isLoading: true,
        create: null
      };
    case actions.CREATE_BEAN_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.CREATE_BEAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        create: data.create
      };
    case actions.PURCHASE_BEAN:
      return {
        ...state,
        isLoading: true,
        purchase: null
      };
    case actions.PURCHASE_BEAN_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.PURCHASE_BEAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        purchase: data.purchase
      };
  }
  return state;
}
export default beans;

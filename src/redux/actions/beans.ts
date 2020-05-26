import * as actions from '../constants/beans';
import { BW } from 'api';
import { BaseBean } from 'models';
import { getProducers } from './producers';
import { getFarms } from './farms';

export const getBeans = () => dispatch => {
  dispatch({ type: actions.GET_BEANS })
  BW.get<BaseBean[]>('/v2/beans')
    .then(beans => { 
      dispatch({ type: actions.GET_BEANS_SUCCESS, data: { beans } })
    })
    .catch(error => dispatch({ type: actions.GET_BEANS_FAILED }))
}

export const getBeanRelatedData = () => dispatch => {
  dispatch(getProducers());
  dispatch(getFarms());
}

export const archiveBean = (beanId) => dispatch => {
  dispatch({ type: actions.ARCHIVE_BEAN })
  BW.post<string>(`/beans/archive/${beanId}`)
    .then(result => {
      let res = '';
      if (result === 'OK'){
        res = beanId;
      }
      dispatch({ type: actions.ARCHIVE_BEAN_SUCCESS, data: { archive: { _id: res }} })
    })
    .catch(error => dispatch({ type: actions.ARCHIVE_BEAN_FAILED }))
}

export const getBeanById = (beanId, callback?: () => void) => dispatch => {
  dispatch({ type: actions.GET_BEAN_BY_ID })
  BW.get<BaseBean>(`/beans/${beanId}`)
    .then(bean => {
      if(callback) callback()
      dispatch({ type: actions.GET_BEAN_BY_ID_SUCCESS, data: { bean } })
    })
    .catch(error =>{
      if(callback) callback();
      dispatch({ type: actions.GET_BEAN_BY_ID_FAILED })
    })
}

export const editBean = (bean) => dispatch => {
  dispatch({ type: actions.EDIT_BEAN })
  BW.post<string>(`/beans/update/${bean._id}`, bean)
    .then(result => {
      let res = '';
      if (result === 'OK'){
        res = bean._id;
      }
      dispatch({ type: actions.EDIT_BEAN_SUCCESS, data: { edit: { _id: res } } })
    })
    .catch(error => dispatch({ type: actions.EDIT_BEAN_FAILED }))
}

export const createBean = (data) => dispatch => {
  dispatch({ type: actions.CREATE_BEAN })
  BW.post<any>(`/beans/create`, data)
    .then(result => {
      dispatch({ type: actions.CREATE_BEAN_SUCCESS, data: { create: { _id: result.bean } } })
    })
    .catch(error => dispatch({ type: actions.CREATE_BEAN_FAILED }))
}

export const purchaseBean = (beanId, data) => dispatch => {
  dispatch({ type: actions.PURCHASE_BEAN })
  BW.post<string>(`/beans/purchase/${beanId}`, {quantity : data.amount, price: data.price})
    .then(result => {
      let res = '';
      if (result === 'OK'){
        res = beanId;
      }
      dispatch({ type: actions.PURCHASE_BEAN_SUCCESS, data: { purchase: { _id: res }} })
    })
    .catch(error => dispatch({ type: actions.PURCHASE_BEAN_FAILED }))
}

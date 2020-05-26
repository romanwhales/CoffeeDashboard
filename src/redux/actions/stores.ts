import * as actions from '../constants/stores';
import { BW } from 'api';
import { BaseStore } from 'models';

export const getStoresByOrganization = (organizationId) => dispatch => {
  dispatch({ type: actions.GET_STORES_ORGANIZATION })
  
    BW.get<BaseStore[]>(`/stores/organization/${organizationId}`)
    .then(stores => {
      stores.forEach(item => {
        item.value = item._id
        item.label = item.name
      })
      
      dispatch({
        type: actions.GET_STORES_ORGANIZATION_SUCCESS, 
      
        data: { stores } 
      })
    })
    // .then(stores => dispatch({ 
      
    //   type: actions.GET_STORES_ORGANIZATION_SUCCESS, 
      
    //   data: { stores } 
    // }))
    .catch(error => dispatch({ type: actions.GET_STORES_ORGANIZATION_FAILED }))

}

export const getStoreById = (storeId) => dispatch => {
  dispatch({ type: actions.GET_STORE })
  BW.get<BaseStore>(`/v2/stores/store/${storeId}`)
    .then(store => {
      dispatch({ type: actions.GET_STORE_SUCCESS, data: { store } })
    })
    .catch(error => dispatch({ type: actions.GET_STORE_FAILED }))
}

export const editStore = (store) => dispatch => {
  dispatch({ type: actions.EDIT_STORE })
  BW.post<string>(`/stores/update/${store._id}`, store)
    .then(result => {
      let res = '';
      if (result === 'OK'){
        res = store._id;
      }
      dispatch({ type: actions.EDIT_STORE_SUCCESS, data: { edit: { _id: res } } })
    })
    .catch(error => dispatch({ type: actions.EDIT_STORE_FAILED }))
}
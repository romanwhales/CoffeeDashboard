import * as React from 'react';
import * as actions from '../constants/producers';
import { BW } from 'api';
import { BaseProducer, AppStore } from 'models';
import ProducerModal from 'modals/ProducerModal';
import { openModal } from './ui';

export const getProducers = () => (dispatch, getState: () => AppStore) => {
  dispatch({ type: actions.GET_PRODUCERS })
  BW.get<BaseProducer[]>('/producers')
    .then(producers => { 
      const userInfo = getState().auth.userInfo;
      let producersByOrganization = [];
      for (let i = 0; i < producers.length; i++){
        if (producers[i].cafe === userInfo.cafes[0]){
          producersByOrganization.push(producers[i]);
        }
      }
      dispatch({ type: actions.GET_PRODUCERS_SUCCESS, data: { producers: producersByOrganization } })
    })
    .catch(error => dispatch({ type: actions.GET_PRODUCERS_FAILED }))
}

export const openCreateProducerModal = (initialName?: string) => dispatch => {
  const ModalComponent = () => (<ProducerModal initialName={initialName} />);
  dispatch(openModal(ModalComponent));
}

export const createProducer = (data) => dispatch => {
  dispatch({ type: actions.CREATE_PRODUCER })
  BW.post<any>(`/producers/create`, data)
    .then(result => {
      dispatch({ type: actions.CREATE_PRODUCER_SUCCESS, data: { create: { _id: result.producer, name: data.name } } })
    })
    .catch(error => dispatch({ type: actions.CREATE_PRODUCER_FAILED }))
}

export const archiveProducer = (producerId) => dispatch => {
  dispatch({ type: actions.ARCHIVE_PRODUCER })
  BW.post<string>(`/producers/archive/${producerId}`)
    .then(result => {
      let res = '';
      if (result === 'OK'){
        res = producerId;
      }
      dispatch({ type: actions.ARCHIVE_PRODUCER_SUCCESS, data: { archive: { _id: res }} })
    })
    .catch(error => dispatch({ type: actions.ARCHIVE_PRODUCER_FAILED }))
}

export const getProducerById = (producerId) => dispatch => {
  dispatch({ type: actions.GET_PRODUCER_BY_ID })
  BW.get<BaseProducer>(`/producers/${producerId}`)
    .then(producer => {
      dispatch({ type: actions.GET_PRODUCER_BY_ID_SUCCESS, data: { producer } })
    })
    .catch(error => dispatch({ type: actions.GET_PRODUCER_BY_ID_FAILED }))
}

export const editProducer = (producer) => dispatch => {
  dispatch({ type: actions.EDIT_PRODUCER })
  BW.post<string>(`/producers/update/${producer._id}`, producer)
    .then(result => {
      let res = '';
      if (result === 'OK'){
        res = producer._id;
      }
      dispatch({ type: actions.EDIT_PRODUCER_SUCCESS, data: { edit: { _id: res } } })
    })
    .catch(error => dispatch({ type: actions.EDIT_PRODUCER_FAILED }))
}
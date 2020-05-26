import * as React from 'react';
import * as actions from '../constants/farms';
import { BW } from 'api';
import { BaseFarm } from 'models';
import FarmModal from 'modals/FarmModal';
import { openModal } from './ui';

export const getFarms = () => dispatch => {
  dispatch({ type: actions.GET_FARMS })
  BW.get<BaseFarm[]>('/farms')
    .then(farms => dispatch({ type: actions.GET_FARMS_SUCCESS, data: { farms } }))
    .catch(error => dispatch({ type: actions.GET_FARMS_FAILED }))
}

export const openCreateFarmModal = (initialName?: string) => dispatch => {
  const ModalComponent = () => (<FarmModal initialName={initialName} />);
  dispatch(openModal(ModalComponent));
}

export const createFarm = (data) => dispatch => {
  dispatch({ type: actions.CREATE_FARM })
  BW.post<any>(`/farms/create`, data)
    .then(result => {
      dispatch({ type: actions.CREATE_FARM_SUCCESS, data: { create: { _id: result.farm } } })
    })
    .catch(error => dispatch({ type: actions.CREATE_FARM_FAILED }))
}
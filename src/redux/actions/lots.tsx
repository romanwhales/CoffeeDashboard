import * as React from 'react';
import * as actions from '../constants/lots';
import { BW } from 'api';
import { BaseLot } from 'models';
import LotModal from 'modals/LotModal';
import { openModal } from './ui';

export const getLots = () => dispatch => {
  dispatch({ type: actions.GET_LOTS })
  BW.get<BaseLot[]>('/lots')
    .then(lots => dispatch({ type: actions.GET_LOTS_SUCCESS, data: { lots } }))
    .catch(error => dispatch({ type: actions.GET_LOTS_FAILED }))
}

export const openCreateLotModal = (initialName?: string) => dispatch => {
  const ModalComponent = () => (<LotModal initialName={initialName} />);
  dispatch(openModal(ModalComponent));
}
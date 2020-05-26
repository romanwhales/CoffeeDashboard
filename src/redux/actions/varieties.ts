import * as actions from '../constants/varieties';
import { BW } from 'api';
import { BaseVariety } from 'models';
import { orderBy } from 'lodash';

export const getVarieties = () => dispatch => {
  dispatch({ type: actions.GET_VARIETIES })
  BW.get<BaseVariety[]>('/varieties')
    .then(varieties => {
      varieties = orderBy(varieties, ['name'], ['asc']);
      dispatch({ type: actions.GET_VARIETIES_SUCCESS, data: { varieties } })
    })
    .catch(error => dispatch({ type: actions.GET_VARIETIES_FAILED }))
}
import * as actions from '../constants/cuppingNotes1';
import { BW } from 'api';
import { BaseCuppingNote1 } from 'models';
import { orderBy } from 'lodash';

export const getCuppingNotes1 = () => dispatch => {
  dispatch({ type: actions.GET_CUPPING_NOTES_1 })
  BW.get<BaseCuppingNote1[]>('/flavors-level-one')
    .then(cuppingNotes1 => {
      cuppingNotes1 = orderBy(cuppingNotes1, ['name'], ['asc']);
      dispatch({ type: actions.GET_CUPPING_NOTES_1_SUCCESS, data: { cuppingNotes1 } })
    })
    .catch(error => dispatch({ type: actions.GET_CUPPING_NOTES_1_FAILED }))
}
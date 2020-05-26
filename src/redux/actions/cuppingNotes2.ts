import * as actions from '../constants/cuppingNotes2';
import { BW } from 'api';
import { BaseCuppingNote2 } from 'models';
import { orderBy } from 'lodash';

export const getCuppingNotes2 = () => dispatch => {
  dispatch({ type: actions.GET_CUPPING_NOTES_2 })
  BW.get<BaseCuppingNote2[]>('/flavors-level-two')
    .then(cuppingNotes2 => {
      cuppingNotes2 = orderBy(cuppingNotes2, ['name'], ['asc']);
      dispatch({ type: actions.GET_CUPPING_NOTES_2_SUCCESS, data: { cuppingNotes2 } })
    })
    .catch(error => dispatch({ type: actions.GET_CUPPING_NOTES_2_FAILED }))
}
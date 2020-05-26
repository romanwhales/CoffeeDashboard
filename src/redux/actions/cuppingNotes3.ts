import * as actions from '../constants/cuppingNotes3';
import { BW } from 'api';
import { BaseCuppingNote3 } from 'models';
import { orderBy } from 'lodash';

export const getCuppingNotes3 = () => dispatch => {
  dispatch({ type: actions.GET_CUPPING_NOTES_3 })
  BW.get<BaseCuppingNote3[]>('/flavors-level-three')
    .then(cuppingNotes3 => {
      cuppingNotes3 = orderBy(cuppingNotes3, ['name'], ['asc']);
      dispatch({ type: actions.GET_CUPPING_NOTES_3_SUCCESS, data: { cuppingNotes3 } })
    })
    .catch(error => dispatch({ type: actions.GET_CUPPING_NOTES_3_FAILED }))
}
import * as actions from '../constants/processes';
import { BW } from 'api';
import { BaseProcess } from 'models';
import { orderBy } from 'lodash';

export const getProcesses = () => dispatch => {
  dispatch({ type: actions.GET_PROCESSES })
  BW.get<BaseProcess[]>('/processes')
    .then(processes => {
      processes = orderBy(processes, ['name'], ['asc']);
      dispatch({ type: actions.GET_PROCESSES_SUCCESS, data: { processes } })
    })
    .catch(error => dispatch({ type: actions.GET_PROCESSES_FAILED }))
}
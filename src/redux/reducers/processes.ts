import * as actions from '../constants/processes';
import { ProcessesReducer } from "models";

const initialState: ProcessesReducer = {
  isLoading: false,
  processes: [],
};

const processes = (state: ProcessesReducer = initialState, action: { type: string, data?: any }): ProcessesReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_PROCESSES:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_PROCESSES_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_PROCESSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        processes: [...data.processes || []]
      };
  }
  return state;
}
export default processes;
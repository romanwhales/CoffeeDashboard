import * as actions from '../constants/cuppingNotes2';
import { CuppingNotes2Reducer } from "models";

const initialState: CuppingNotes2Reducer = {
  isLoading: false,
  cuppingNotes2: [],
};

const cuppingNotes2 = (state: CuppingNotes2Reducer = initialState, action: { type: string, data?: any }): CuppingNotes2Reducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_CUPPING_NOTES_2:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_CUPPING_NOTES_2_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_CUPPING_NOTES_2_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cuppingNotes2: [...data.cuppingNotes2 || []]
      };
  }
  return state;
}
export default cuppingNotes2;
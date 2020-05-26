import * as actions from '../constants/cuppingNotes1';
import { CuppingNotes1Reducer } from "models";

const initialState: CuppingNotes1Reducer = {
  isLoading: false,
  cuppingNotes1: [],
};

const cuppingNotes1 = (state: CuppingNotes1Reducer = initialState, action: { type: string, data?: any }): CuppingNotes1Reducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_CUPPING_NOTES_1:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_CUPPING_NOTES_1_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_CUPPING_NOTES_1_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cuppingNotes1: [...data.cuppingNotes1 || []]
      };
  }
  return state;
}
export default cuppingNotes1;
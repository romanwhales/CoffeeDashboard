import * as actions from '../constants/cuppingNotes3';
import { CuppingNotes3Reducer } from "models";

const initialState: CuppingNotes3Reducer = {
  isLoading: false,
  cuppingNotes3: [],
};

const cuppingNotes3 = (state: CuppingNotes3Reducer = initialState, action: { type: string, data?: any }): CuppingNotes3Reducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_CUPPING_NOTES_3:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_CUPPING_NOTES_3_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_CUPPING_NOTES_3_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cuppingNotes3: [...data.cuppingNotes3 || []]
      };
  }
  return state;
}
export default cuppingNotes3;
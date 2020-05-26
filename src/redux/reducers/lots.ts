import * as actions from '../constants/lots';
import { LotsReducer } from "models";

const initialState: LotsReducer = {
  isLoading: false,
  lots: [],
};

const lots = (state: LotsReducer = initialState, action: { type: string, data?: any }): LotsReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_LOTS:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_LOTS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_LOTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lots: [...data.lots || []]
      };
  }
  return state;
}
export default lots;

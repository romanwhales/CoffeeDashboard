import * as actions from '../constants/varieties';
import { VarietiesReducer } from "models";

const initialState: VarietiesReducer = {
  isLoading: false,
  varieties: [],
};

const varieties = (state: VarietiesReducer = initialState, action: { type: string, data?: any }): VarietiesReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_VARIETIES:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_VARIETIES_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_VARIETIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        varieties: [...data.varieties || []]
      };
  }
  return state;
}
export default varieties;
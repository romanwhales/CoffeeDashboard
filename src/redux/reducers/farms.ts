import * as actions from '../constants/farms';
import { FarmsReducer } from "models";

const initialState: FarmsReducer = {
  isLoading: false,
  farms: [],
  create: null
};

const farms = (state: FarmsReducer = initialState, action: { type: string, data?: any }): FarmsReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_FARMS:
      return {
        ...state,
        isLoading: true,
        create: null
      };
    case actions.GET_FARMS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_FARMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        farms: [...data.farms || []]
      };
    case actions.CREATE_FARM:
      return {
        ...state,
        isLoading: true,
        create: null
      };
    case actions.CREATE_FARM_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.CREATE_FARM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        create: data.create
      };
  }
  return state;
}
export default farms;

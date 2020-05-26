import * as actions from '../constants/roastProfiles';
import { RoastProfilesReducer } from "models";

const initialState: RoastProfilesReducer = {
  isLoading: false,
  roastProfiles: [],
};

const roastProfiles = (state: RoastProfilesReducer = initialState, action: { type: string, data?: any }): RoastProfilesReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_ROAST_PROFILES:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_ROAST_PROFILES_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_ROAST_PROFILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roastProfiles: [...data.roastProfiles || []]
      };
  }
  return state;
}
export default roastProfiles;
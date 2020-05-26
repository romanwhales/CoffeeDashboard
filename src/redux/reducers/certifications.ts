import * as actions from '../constants/certifications';
import { CertificationsReducer } from "models";

const initialState: CertificationsReducer = {
  isLoading: false,
  certifications: [],
};

const certifications = (state: CertificationsReducer = initialState, action: { type: string, data?: any }): CertificationsReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_CERTIFICATIONS:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_CERTIFICATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case actions.GET_CERTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        certifications: [...data.certifications || []]
      };
  }
  return state;
}
export default certifications;
import * as actions from '../constants/ui';
import { UIReducer } from "models";

const initialState: UIReducer = {
  openModal: null,
};

const ui = (state: UIReducer = initialState, action: { type: string, data?: any }): UIReducer => {
  const { type, data } = action;
  switch (type) {
    case actions.OPEN_MODAL: {
      return {
        ...state,
        openModal: data.modalComponent,
      }
    }
    case actions.CLOSE_MODAL:
      return {
        ...state,
        openModal: null,
      }
    default:
      return state;
  }
};
export default ui;

import * as actions from '../constants/ui';

export const openModal = (modalComponent: React.ReactNode) => dispatch => {
  dispatch({
    type: actions.OPEN_MODAL,
    data: { modalComponent },
  })
};

export const closeModal = () => ({ type: actions.CLOSE_MODAL });
import * as actions from '../constants/certifications';
import { BW } from 'api';
import { BaseCertification } from 'models';
import { orderBy } from 'lodash';

export const getCertifications = () => dispatch => {
  dispatch({ type: actions.GET_CERTIFICATIONS })
  BW.get<BaseCertification[]>('/certifications')
    .then(certifications => {
      certifications = orderBy(certifications, ['name'], ['asc']);
      dispatch({ type: actions.GET_CERTIFICATIONS_SUCCESS, data: { certifications } })
    })
    .catch(error => dispatch({ type: actions.GET_CERTIFICATIONS_FAILED }))
}
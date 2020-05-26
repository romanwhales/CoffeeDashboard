import * as actions from '../constants/roastProfiles';
import { BW } from 'api';
import { BaseRoastProfile } from 'models';
import { orderBy } from 'lodash';

export const getRoastProfiles = () => dispatch => {
  dispatch({ type: actions.GET_ROAST_PROFILES })
  BW.get<BaseRoastProfile[]>('/roast-profiles')
    .then(roastProfiles => {
      let list = [];
      for (let i = 0; i < roastProfiles.length; i++){
        if (roastProfiles[i].privacy === 'public'){
          list.push(roastProfiles[i]);
        }
      }
      list = orderBy(list, ['name'], ['asc']);
      dispatch({ type: actions.GET_ROAST_PROFILES_SUCCESS, data: { roastProfiles: list } })
    })
    .catch(error => dispatch({ type: actions.GET_ROAST_PROFILES_FAILED }))
}
import { get } from 'lodash';
import configStore from "redux/store/configStore";

export default function (includeStore?: boolean): {} | { cafe: string } | { cafe: string, store: string } {
  const { store: reduxStore } = configStore();
  const state = reduxStore.getState();
  const { isAuthenticated, userInfo } = state.auth;
  if (!isAuthenticated) {
    return {};
  }
  const cafe = get(state.auth.userInfo.currentProfile, 'cafe', get(state.auth.userInfo, 'cafes[0]'));
  const store = get(state.auth.userInfo.currentProfile, 'store');
  return includeStore ? { cafe, store } : { cafe };
}
import { combineReducers, Reducer } from 'redux';
import { AppStore } from 'models/store';
import auth from './auth';
import producers from './producers';
import farms from './farms';
import lots from './lots';
import beans from './beans';
import ui from './ui';
import organizations from './organizations';
import roastProfiles from './roastProfiles';
import certifications from './certifications';
import processes from './processes';
import varieties from './varieties';
import cuppingNotes1 from './cuppingNotes1';
import cuppingNotes2 from './cuppingNotes2';
import cuppingNotes3 from './cuppingNotes3';
import users from './users';
import stores from './stores';

const appState: Reducer<AppStore> = combineReducers({
  ui,
  auth,
  producers,
  farms,
  lots,
  beans,
  organizations,
  roastProfiles,
  certifications,
  processes,
  varieties,
  cuppingNotes1,
  cuppingNotes2,
  cuppingNotes3,
  users,
  stores
});
export default appState;

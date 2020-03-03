import {combineReducers} from 'redux';

import appReducer from './app';
import releasesReducer from './releases';

const rootReducer = combineReducers({
  app: appReducer,
  releases: releasesReducer
});

export default rootReducer;

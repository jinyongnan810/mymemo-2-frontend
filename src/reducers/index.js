import {combineReducers} from 'redux';

import alert from '../reducers/alert';
import auth from '../reducers/auth';
import memo from '../reducers/memo';

export default combineReducers({auth, alert, memo});

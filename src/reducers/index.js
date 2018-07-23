/*----------  Vendor Imports  ----------*/
import { combineReducers } from 'redux';

/*----------  Custom Imports  ----------*/
import userReducer from './user';

/*========================================
=            Combine Reducers            =
========================================*/

const rootReducer = combineReducers({
  userState: userReducer,
});

export default rootReducer;

/*=====  End of Combine Reducers  ======*/

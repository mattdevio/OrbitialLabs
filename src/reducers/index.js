/*----------  Vendor Imports  ----------*/
import { combineReducers } from 'redux';

/*----------  Custom Imports  ----------*/
import userReducer from './user';
import chatReducer from './chat';

/*========================================
=            Combine Reducers            =
========================================*/

const rootReducer = combineReducers({
  userState: userReducer,
  chatState: chatReducer,
});

export default rootReducer;

/*=====  End of Combine Reducers  ======*/

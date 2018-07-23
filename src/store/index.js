/*----------  Vendor Imports  ----------*/
import { createStore } from 'redux';

/*----------  Custom Imports  ----------*/
import rootReducer from '../reducers';

/*===========================================
=            Create Global Store            =
===========================================*/

const store = createStore(rootReducer);

export default store;

/*=====  End of Create Global Store  ======*/

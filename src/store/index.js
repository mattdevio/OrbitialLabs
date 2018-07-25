/*----------  Vendor Imports  ----------*/
import { createStore } from 'redux';

/*----------  Custom Imports  ----------*/
import rootReducer from '../reducers';

/*===========================================
=            Create Global Store            =
===========================================*/

const store = createStore(rootReducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

/*=====  End of Create Global Store  ======*/

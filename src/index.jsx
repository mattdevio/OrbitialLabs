/*----------  Vendor Imports  ----------*/
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

/*----------  Custom Imports  ----------*/
import App from 'bin/App';
import store from 'store';

// Mount React on the HTML '#root' Node
render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'),
);

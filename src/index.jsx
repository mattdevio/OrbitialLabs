/*----------  Vendor Imports  ----------*/
import React from 'react';
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faLock, faSignal } from '@fortawesome/free-solid-svg-icons';

/*----------  Custom Imports  ----------*/
import Landing from './screens/Landing';

/*----------  Setup  ----------*/
library.add(faCheckCircle, faLock, faSignal);

// Mount React on the HTML '#root' Node
render(
  <Landing />,
  document.getElementById('root'),
);

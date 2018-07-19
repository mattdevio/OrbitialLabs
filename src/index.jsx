/*----------  Vendor Imports  ----------*/
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Redirect } from 'react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faLock, faSignal } from '@fortawesome/free-solid-svg-icons';

/*----------  Custom Imports  ----------*/
import Landing from './screens/Landing';
import Chat from './screens/Chat';

/*----------  Setup  ----------*/
library.add(faCheckCircle, faLock, faSignal);

// Mount React on the HTML '#root' Node
render(
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/chat' component={Chat} />
      <Route render={() => <Redirect to='/' />} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);

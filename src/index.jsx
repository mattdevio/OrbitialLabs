/*----------  Vendor Imports  ----------*/
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faLock, faSignal } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

/*----------  Custom Imports  ----------*/
import history from './services/history';
import Landing from './screens/Landing';
import Chat from './screens/Chat';
import Authenticate from './screens/Authenticate';
import Register from './screens/Register';

/*----------  Setup  ----------*/
library.add(faCheckCircle, faLock, faSignal);

// Mount React on the HTML '#root' Node
render(
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/chat' component={Chat} />
      <Route path='/auth' component={Authenticate} />
      <Route path='/register' component={Register} />
      <Route render={() => <Redirect to='/' />} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);


// Signup
// axios.post('/api/user/signup', {
//   username: 'newusername',
//   email: 'email@email.com',
//   password: 'password',
// }).then(console.dir).catch(console.dir);

// Login
axios.post('/api/user/login', {
  email: 'email@email.com',
  password: 'password',
}).then(console.dir).catch(console.dir);



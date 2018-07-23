/*----------  Vendor Imports  ----------*/
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faLock, faSignal, faMicrophone, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import io from 'socket.io-client';

/*----------  Custom Imports  ----------*/
import history from './services/history';
import Landing from './screens/Landing';
import Chat from './screens/Chat';
import Authenticate from './screens/Authenticate';
import Register from './screens/Register';

/*----------  Setup  ----------*/
library.add(faCheckCircle, faLock, faSignal, faMicrophone, faEllipsisH);

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
}).then((res) => {

  const { success, token, error } = res.data;
  if (success) {

    console.log(token);

    const socket = io({
      path: '/chat',
      extraHeaders: {
        authorizations: token,
      },
    });

    socket.on('error', (data) => {
      console.log(data);
    });

    // axios.get('/api/user/test', {
    //   headers: {
    //     authorization: token,
    //   },
    // }).then((res) => {
    //   console.log(res.data);
    // }).catch(console.dir);

  } else {
    console.log(error);
  }

}).catch(console.dir);


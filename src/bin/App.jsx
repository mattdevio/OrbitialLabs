/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faLock, faSignal } from '@fortawesome/free-solid-svg-icons';

/*----------  Custom Imports  ----------*/
import { 
  Landing,
  Chat,
  Authenticate,
  Register,
} from 'screens';

/*----------  Setup  ----------*/
library.add(faCheckCircle, faLock, faSignal);

/*=====================================
=            App Component            =
=====================================*/

class App extends Component {

  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return (
      <Router history={ this.history }>
        <Switch>
          <Route exact path='/' component={ Landing } />
          <Route path='/chat' component={Chat} />
          <Route path='/auth' component={Authenticate} />
          <Route path='/register' component={Register} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </Router>
    );
  }

}

export default App;

/*=====  End of App Component  ======*/

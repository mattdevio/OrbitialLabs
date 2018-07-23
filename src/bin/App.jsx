/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faLock, faSignal } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import * as routes from 'constants/routes';
import { 
  Landing,
  Chat,
  Authenticate,
  Register,
} from 'screens';
import {
  Header,
} from 'components';

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
        <AppContainer>
          <BackgroundGradient />
          <Header />
          <Switch>
            <Route exact path={ routes.LANDING } component={ Landing } />
            <Route path={ routes.CHAT } component={Chat} />
            <Route path={ routes.AUTH } component={Authenticate} />
            <Route path={ routes.REGISTER } component={Register} />
            <Route render={() => <Redirect to={ routes.LANDING } />} />
          </Switch>
        </AppContainer>
      </Router>
    );
  }

}

export default App;

/*=====  End of App Component  ======*/

const AppContainer = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const BackgroundGradient = styled.div`
  background: linear-gradient(90deg, rgba(85,91,186,1) 0%, rgba(16,218,255,1) 100%);
  clip-path: polygon(0 0, 6000px 0, 1600px 75%, 0 100%);
  width: 100%;
  height: 90%;
  position: absolute;
`;

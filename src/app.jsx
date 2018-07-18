import React, { Component } from 'react';
import SplashView from './components/splash';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faLock, faSignal } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faLock, faSignal);

class App extends Component {

  render() {
    return <SplashView />;
  }
}

export default App;

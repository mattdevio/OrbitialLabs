/*----------  Vendor Imports  ----------*/
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

/*----------  Custom Imports  ----------*/

// Test React
render(
  <Fragment>
    <img src="/assets/images/test.png" />
  </Fragment>,
  document.getElementById('root'),
);

// Test Axios
axios.get('/api')
  .then(response => console.log(response.data.message))
  .catch(err => console.log(err));

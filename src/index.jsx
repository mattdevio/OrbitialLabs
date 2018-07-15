/*----------  Vendor Imports  ----------*/
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import io from 'socket.io-client';

/*----------  Custom Imports  ----------*/

// Test React
render(
  <Fragment>
    <h1>React Works! :)</h1>
    <img src="/assets/images/test.png" />
  </Fragment>,
  document.getElementById('root'),
);

// Test Axios
axios.get('/api')
  .then(response => console.log(response.data.message))
  .catch(err => console.log(err));

// Test Sockets
const socket = io('http://localhost:3000' , {path: '/chat'});
socket.on('ack', (data) => {
  console.log(data);
});

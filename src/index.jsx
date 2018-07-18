/*----------  Vendor Imports  ----------*/
import React from 'react';
import { render } from 'react-dom';
import App from './app';
import axios from 'axios';
import io from 'socket.io-client';

/*----------  Custom Imports  ----------*/

// Test React
render(
  <App />,
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

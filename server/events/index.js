/*----------  Vendor Imports  ----------*/

/*----------  Custom Imports  ----------*/
const util = require('../lib/utility').getInstance();


function BindEventMiddleware(io) {

  io.on('connection', function(socket) {

    util.log(`New socket ${socket.id} connected!`);
    socket.emit('ack', `Your socket id is ${socket.id}`);

  });

}

// Export Middleware
module.exports = BindEventMiddleware;

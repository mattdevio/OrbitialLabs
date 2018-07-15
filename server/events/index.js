/*----------  Vendor Imports  ----------*/

/*----------  Custom Imports  ----------*/
const { log } = require('../utility');


function BindEventMiddleware(io) {

  io.on('connection', function(socket) {

    log.info(`New socket ${socket.id} connected!`);
    socket.emit('ack', `Your socket id is ${socket.id}`);

  });

}

// Export Middleware
module.exports = BindEventMiddleware;

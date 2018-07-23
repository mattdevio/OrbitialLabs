/*----------  Vendor Imports  ----------*/

/*----------  Custom Imports  ----------*/
const util = require('../lib/utility').getInstance();
const auth = require('../lib/auth');


function BindEventMiddleware(io) {

  io.set('authorization', ({ headers }, callback) => {

    auth.verifyJWToken(headers.authorization)
      .then((decodedToken) => {
        util.log(JSON.stringify(decodedToken, null, 2));
        callback(null, true);
      })
      .catch((err) => {
        util.log(err);
        callback('auth failed', false);
      });

  });

  io.sockets.on('connection', function(socket) {

    util.log(`socket connected : ${socket.id}`);

  });

}

// Export Middleware
module.exports = BindEventMiddleware;

const socketJwtAuth = require('../middlewares/socketJwtAuth');

const socketRoute = (io, redisClient) => {
  io.use(async (socket, next) => {
    await socketJwtAuth(io, redisClient, socket, next);
  });

  io.on('connection', (socket) => {
    console.log('new socket connection', socket.request.user);

    // On receiving the event 'message', we'll respond with the same event back
    // to the client's socket.
    socket.on('message', (message) => {
      console.log(
        `Socket.IO event 'message' from client with payload: ${message}`
      );
      socket.emit('message', `server response: ${message}`);
    });
  });
};

module.exports = {
  socketRoute,
};

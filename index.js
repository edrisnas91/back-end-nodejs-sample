/** This is a description of the foo function. */
const express = require('express');
const http = require('http');

const app = express();
const router = express.Router();

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const Redis = require('ioredis');
const socketIoRedis = require('socket.io-redis');
const socketIo = require('socket.io');
const passport = require('passport');
const validationError = require('./server/middlewares/validationError');

const routes = require('./server/routes');
require('./server/middlewares/passport')(passport);
const socketHandler = require('./server/socket');

const config = require('./server/config/config');

require('dotenv').config();

const db = require('./server/models');

const server = http.createServer(app);
const redisClient = new Redis(config.redis.port, config.redis.host);

const io = socketIo(server, {
  cors: {
    origin: '*',
  },
  adapter: socketIoRedis({
    pubClient: redisClient,
    subClient: redisClient.duplicate(),
  }),
});

socketHandler.socketRoute(io, redisClient);

db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(
  fileUpload({
    limits: { fileSize: 1 * 1024 * 1024 },
  })
);

app.use(passport.initialize());
app.use(router);
app.use(
  cors({
    origin: '*',
  })
);

// GROUP APP ROUTES
app.use('/api', routes);
if (config.env === 'development') {
  router.get('/', (req, res) => {
    res.redirect('/api/v1/docs');
  });
}

app.use(validationError);

app.locals.io = io;
app.locals.redisClient = redisClient;

server.listen(config.port, () => {
  console.log(`app listening at ${config.apiUrl}:${config.port}`);
});

const express = require('express');
const config = require('../../config/config');
const admin = require('./admins');
const auth = require('./auth');
const docsRoute = require('./docs');

const router = express.Router();
/** this is test get route */

console.log('consfig env', config.env);
if (config.env === 'development') {
  router.use('/docs', docsRoute);
}

router.use('/admins', admin);
router.use('/auth', auth);

module.exports = router;

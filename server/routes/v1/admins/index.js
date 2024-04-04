const express = require('express');
const admin = require('./admin');

const router = express.Router();
/** this is test get route */

router.use('/', admin);

module.exports = router;

const express = require('express');
const router = express.Router();

const fileRouter = require('./file');

router.use('/', fileRouter)

module.exports = router;
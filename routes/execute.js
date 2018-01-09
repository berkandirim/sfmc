const express = require('express');
const router = express.Router();
const logData = require('../helpers/logdata');

router.post('/', (req, res, next) => {
  logData.logData( req );
  res.status(200).send('Execute');
});

module.exports = router;

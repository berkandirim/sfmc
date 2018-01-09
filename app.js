const express = require('express');
const path = require('path');

const execute = require('./routes/execute');
const publish = require('./routes/publish');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/execute', execute);
app.use('/publish', publish);

module.exports = app;

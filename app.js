const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const execute = require('./routes/execute');
const publish = require('./routes/publish');
const post = require('./routes/post');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/execute', execute);
app.use('/publish', publish);
app.use('/post', post);

module.exports = app;

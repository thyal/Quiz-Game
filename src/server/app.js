const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

module.exports = app;
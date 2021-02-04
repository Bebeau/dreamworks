const config = require('./config/keys');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// var request = require('superagent');
// const crypto = require('crypto');

const app = express();

// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/app/build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'client', 'app', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

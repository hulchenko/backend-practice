require('dotenv').config();
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

console.log('Hello World');

app.use(function (req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

app.use('/public', express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function (req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({
      message: 'HELLO JSON',
    });
  }
  res.json({
    message: 'Hello json',
  });
});

app.get(
  '/now',
  function (req, res, next) {
    next();
  },
  function (req, res) {
    var time = new Date().toString();
    console.log('time' + time);
    res.json({ time: time });
  }
);

app.get('/:word/echo', (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

app.get('/name', function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

app.use(bodyParser.json());

app.post('/name', function (req, res) {
  // Handle the data in the request
  var string = req.body.first + ' ' + req.body.last;
  res.json({ name: string });
});

module.exports = app;

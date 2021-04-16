/** 1) Meet the node console. */
var express = require('express');
var app = express();
// The next line is for Challenge No. 11
// var bodyParser = require("body-parser");

console.log('Hello World');

// --> 7)  Mount the Logger middleware here
app.use(function (req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

// --> 11)  Mount the body-parser middleware  here
// app.use(bodyParser.urlencoded({extended: false}))
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

/** 2) A first working Express Server */
// app.get("/", function(req, res) {
//   res.send("Hello Express");
// });

/** 3) Serve an HTML file */
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/** 4) Serve static assets  */
// Normal usage
app.use(express.static(__dirname + '/public'));
// Assets at the /assets route
// app.use("/assets", express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
// app.get("/json", (req, res) => {
//   res.json({
//     message: "Hello json"
//   });
// });

/** 6) Use the .env file to configure the app */
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

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */
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

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

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

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.json());

/** 12) Get data form POST  */
app.post('/name', function (req, res) {
  // Handle the data in the request
  var string = req.body.first + ' ' + req.body.last;
  res.json({ name: string });
});

/** app.listen(process.env.PORT || 3000 ); */
//------------------------------

module.exports = app;

const express       = require('express');
const logger        = require('morgan');
const bodyParser    = require('body-parser');

// This will be our application entry. We'll setup our server here.
const http = require('http');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/fetch', (req, res) => {
  request(
    { url: req.query.url },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).send('error');
      }
      res.send(body);
    }
  )
});

const logController = (req, res, next) => {
    //Això s'ha posat degut a l'error de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE');
    // do logging
    console.log('req.method = ' + req.method);
    console.log('req.URL = ' + req.originalUrl);
    console.log('req.body = ' + JSON.stringify(req.body));
    console.log("======================");
    //console.log('req.path = ' + req.path);
    //console.log('req.route = ' + req.route);
    next(); // make sure we go to the next routes and don't stop here
};
app.use('*',                   logController);

require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
     message: 'Welcome to the beginning of nothingness.',
}));
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
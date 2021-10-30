/* Controllers */
const estudiantController = require('../controllers/estudiant');
const facultatController = require('../controllers/facultat');
const desplacamentController = require('../controllers/desplacament');
module.exports = (app) => {
   app.get('/api', (req, res) => res.status(200).send ({
        message: 'Example project did not give you access to the api web services',
   }));
   // middleware to use for all requests
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
   app.post('/api/estudiant/create', estudiantController.create);
   app.get('/api/estudiant/list', estudiantController.list);
   app.get('/api/estudiant/find/id/:id', estudiantController.find);
   app.delete('/api/estudiant/destroy/id/:id', estudiantController.destroy);
   app.put('/api/estudiant/update/id/:id', estudiantController.update);

   app.post('/api/facultat/create', facultatController.create);
   app.get('/api/facultat/list', facultatController.list);
   app.get('/api/facultat/find/id/:id', facultatController.find);
   app.delete('/api/facultat/destroy/id/:id', facultatController.destroy);
   app.put('/api/facultat/update/id/:id', facultatController.update);

   app.get('/api/desplacament/list', desplacamentController.list);
   app.get('/api/desplacament/find/id/:id', desplacamentController.find);
   app.post('/api/desplacament/create', desplacamentController.create);
   app.delete('/api/desplacament/destroy/id/:id', desplacamentController.destroy);
   app.put('/api/desplacament/update/id/:id', desplacamentController.update);
};
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./app/routes/routes');
const miners = require('./app/routes/miner.routes');
const mining = require('./app/routes/mining.routes');
const keys = require('./app/routes/key.routes');

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cors()); 

//require('./app/routes/transaction.routes')(app);

routes(app);
miners(app);
mining(app);
keys(app);
 
// Create a Server
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
 
})
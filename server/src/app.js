//Définition des modules
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dbConnect = require('../config/db');

//Connexion à la base de donnée
mongoose.connect(dbConnect.url, {
  auth: {
    user: dbConnect.Admin,
    password: dbConnect.password
  },
  useNewUrlParser:true
}, function(err, client) {
  if (err) {
    console.log(err);
  }
  console.log('Connect on : ' + dbConnect.url );
});

//Body Parser
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Acces au public
app.use('/static', express.static('public'));
app.use(express.static(__dirname + '/public'));

//Définition des CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//Routes
app.use('/api/users', require('../routes/users'));
app.use('/api/complaints', require('../routes/complaints'));
// app.use('/api/login', require('./routes/login'));
// app.use('/api/home', require('./routes/home'));
// app.use('/api/supplier', require('./routes/supplier'));
// app.use('/api/program', require('./routes/program'));
// app.use('/api/user', require('./routes/user'));


//Middleware pour nos messages d'erreur
app.use(function (err, req, res, next) {
  res.status(500).send({ error: err.message })
})

//Définition et mise en place du port d'écoute
const port = 5000;
app.listen(port, () => console.log(`serveur lancé sur le port ${port}.`));
'use strict';

//Import the mongoose module
var mongoose = require('mongoose');

// Set up express app
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.listen(5000);

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/ComplaintsApp';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Création du User Schema selon les schémas mongoose */
var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  role: String,
  password: String,
  email: String
});

/* Création du User model selon le schéma créé */
var Users = mongoose.model('User', userSchema);

app.get('/', function (req, res) {
  res.send("Server started");
});

app.get('/users', function (req, res) {
  console.log(" app get in backend");
  Users.find({}, function (response, docs) {
    console.log("docs", docs);
    res.json(docs);
    // return (docs);
  });
});

// Users.find((response, docs) => {
//   // console.log("docs", docs);
// });


// /* Création d'un user (local) à partir du modèle user */
// var DamienDubois = new Users({
//   firstName: 'Damien',
//   lastName: 'Dubois',
//   role: 'SimpleUser',
//   password: 'DamienDubois',
//   email: 'damien.dubois@gmail.com'
// });

// /* Ajout du User à la collection Users de la DB */
// DamienDubois.save(err => {
//   if (err) console.log(err);
//   else console.log("user saved")
// })
//# sourceMappingURL=app2.js.map
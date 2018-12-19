//Import the mongoose module
var mongoose = require('mongoose');

// Set up express app
const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
  next()
});

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
  email:String,
});

/* Création du User model selon le schéma créé */
var Users = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send("Server started")
});

app.get('/users', (req, res) => {
  console.log(" app get in backend")
  Users.find({},(results, docs) => {
    console.log("docs", docs)
    res.status(200).json(docs);
  });
})

app.post('/users/new', (req, res) => {
  // console.log(" app get in backend")
  // Users.find({},(results, docs) => {
  //   console.log("docs", docs)
  //   res.status(200).json(docs);
  // });
})

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
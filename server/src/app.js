// const express = require('express');
// const morgan = require('morgan');
// const bodyParser= require('body-parser');
// const app = express();
// const MongoClient = require('mongodb').MongoClient;
// // let db;

// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
//   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//   next();
// });

// MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
//   if (err) return console.log(err)
//   db = client.db('ComplaintsApp');
//   app.listen(5000, () => {
//     console.log('listening on 5000')
//   });
// });

// app.get('/users', (req, res) => {
//   db.collection('users').find().toArray((err, results) => {
//     console.log(results);
//   })
// })

// app.post('/users/:id', (req, res) => {
//   db.collection('users').save(req.body, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })

// // app.use(app.router);
// // routes.initialize(app);



// /// Error 404
// // app.use(function (req, res, next) {
// //   var err = new Error('Not Found');
// //   err.status = 404;
// //   next(err);
// // });


// let server = app.listen(process.env.PORT || 5000, function () {
//   console.log('Listening on port ' + server.address().port);
// });

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');

let server = app.listen(process.env.PORT || 5000, function () {
  console.log('Listening on port ' + server.address().port);
});

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

mongoose.connect('mongodb://localhost/ComplaintsApp');
var db = mongoose.connection;

app.get('/', function(req, res){
  res.send("Server started")
});

app.get('/users', function(req, res){
  console.log("users in app.js côté back");
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    /* Récupération de tous les User de la db */
    Users.find((response, docs) => {
      console.log("docs", docs);
    });
  });
  // res.send(res)
});

/* Création d'un user (local) à partir du modèle user */
// var DamienDubois = new Users({
//   firstName: 'Damien',
//   lastName: 'Dubois',
//   role: 'SimpleUser',
//   password: 'DamienDubois',
//   email: 'damien.dubois@gmail.com'
// });

/* Ajout du User à la collection Users de la DB */
// mongoose.connection.collection('Users').insertOne(DamienDubois);

/* Suppression du User dont le firstName est Damien */
// User.findOneAndDelete({firstName:'Damien'}, (res, docs) => {
//   console.log("res", docs);
// });

// /* Suppression de tous les User dont le firstName est Audrey */
// User.deleteMany({firstName:'Audrey'}, (res, docs) => {
//   console.log("res", docs);
// });
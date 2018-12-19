const express = require('express');
const router = express.Router();

const users=[
  {
    firstName: "Damien",
    lastName: "Dubois",
    role: "SimpleUser",
    password: "DamienDubois",
    email: "damien.dubois@gmail.com",
    id: 0,
  },
  {
    firstName: "Audrey",
    lastName: "Quintard",
    role: "SimpleUser",
    password: "AudreyQuintard",
    email: "audrey.quintard@gmail.com",
    id: 1,
  },
  {
    firstName: "Stéf",
    lastName: "Guinot",
    role: "Admin",
    password: "StephaneGuinot",
    email: "stephane.guinot@gmail.com",
    id: 2,
  }
];

/**
 * BEGIN MODIFICATIONS
 */

var db

MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('users') // whatever your database name is
  // router.listen(5000, () => {
  //   console.log('listening on 5000')
  // })
})

router.get('/users', function (req, res) {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
});

router.get('/users/:id', function(req,res) {
  let user = {};
  for(let i=0; i<users.length;i++){
    if (users[i].id === req.params.id) user = users[i];
  }
  res.json({user})
})

router.post('/users/new', function(req,res) {
  try {
    users.push(req.body)
    // res.send({ id });
  } catch (error) {
    res.status(500).send({ error })
  }
});

module.exports = router;

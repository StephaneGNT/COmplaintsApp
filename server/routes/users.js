const express = require('express')
const router = express.Router()
const User = require('../models/usersModel')

router.get('/', function (req, res, next) {
    User
        .find({})
        .then(data => {res.send(data)})
})

router.post('/new', function (req, res, next) {
    User
        .create(req.body)
        .then(data => {res.send(data)})
        .catch(next)
})

router.put('/:id', function (req, res, next) {
    User
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(data => { res.sendStatus(200).send(data) })
        .catch(next)
})

router.delete('/:id', function(req, res, next) {
    User
        .findByIdAndDelete({ _id: req.params.id })
        .then(() => { res.sendStatus(200) })
        .catch(next)
})

module.exports = router
const express = require('express')
const router = express.Router()
const Complaint = require('../models/complaintsModel')

// Create new complaint
router.post('/new', function (req, res, next) {
    Complaint
        .create(req.body)
        .then(data => {res.send(data)})
        .catch(next)
})

// Get every user complaints (author or recipients)
router.get('/:user_id', function (req, res, next) {
    Complaint
        .find({ $or: [{author: req.params.user_id}, {recipients: req.params.user_id}] })
        .then(data => {res.send(data)})
})

// Get user sent complaints (author only)
router.get('/sent/:user_id', function (req, res, next) {
    Complaint
        .find({ author: req.params.user_id })
        .then(data => {res.send(data)})
})

// Get user received complaints (recipients only)
router.get('/received/:user_id', function (req, res, next) {
    Complaint
        .find({ recipients: req.params.user_id })
        .then(data => {res.send(data)})
})

// Update specific complaint
router.put('/:id', function (req, res, next) {
    Complaint
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(data => { res.sendStatus(200).send(data) })
        .catch(next)
})

// Delete specific complaint
router.delete('/:id', function(req, res, next) {
    Complaint
        .findByIdAndDelete({ _id: req.params.id })
        .then(() => { res.sendStatus(200) })
        .catch(next)
})

module.exports = router
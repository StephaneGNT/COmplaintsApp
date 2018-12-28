const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
    theme: String,
    title: String,
    author: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    recipients: [String],
    messages:[{
        content: String,
        date: String,
        author: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    }],
    status: String
});

const Complaint = mongoose.model('complaint', ComplaintSchema);

module.exports = Complaint;
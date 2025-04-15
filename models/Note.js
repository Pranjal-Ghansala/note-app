const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = new mongoose.model('Note', noteSchema);
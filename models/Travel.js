const mongoose = require('mongoose');

const Travel = new mongoose.Schema({
    start:          { type: String },
    end:            { type: String },
    distance:       { type: Number },
    cash:           { type: Number }
})

module.exports = Travel;
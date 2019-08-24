const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Travel = new mongoose.Schema({
    name:           { type: String },
    vehicleNumber:  { type: String },
    start:          { type: String },
    end:            { type: String },
    distance:       { type: Number },
    cash:           { type: Number }
})

const User = new mongoose.Schema({
    name:           { type: String },
    age:            { type: Number },
    gender:         { type: String },
    cash:           { type: Number, min: 0, default: 0 },
    isTraveling:    { type: Boolean },
    history:        [Travel],
    travel:         Travel,
    isUser:         {type: Boolean, default: true}
})

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
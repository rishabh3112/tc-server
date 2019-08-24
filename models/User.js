const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
    name:           { type: String },
    age:            { type: Number },
    gender:         { type: String },
    cash:           { type: Number, min: 0, default: 0 },
    isTraveling:    { type: Boolean },
    history:        [Travel],
    travel:         Travel,
    isUser:         {type: Boolean, default: true},
    owner:          {type: String},
    address:        {type: String},
    type:           {type: String},
})

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
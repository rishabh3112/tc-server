const mongoose, { Schema } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: String,
})

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
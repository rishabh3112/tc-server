const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Vendor = new mongoose.Schema({
    name: {type: String},
    owner: {type: String},
    address: {type: String},
    type: {type: String},
    isVendor: {type: Boolean, default: true}
});

Vendor.plugin(passportLocalMongoose);
module.exports = mongoose.model('Vendor', Vendor);
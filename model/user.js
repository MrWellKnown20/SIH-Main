const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilePicture: String
});

//he is take username and password default 
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
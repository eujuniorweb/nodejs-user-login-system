const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeauth');

const db = mongoose.connection;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    profileimage:{
        type:String
    }

});
var User = module.exports = mongoose.model('User',UserSchema);
 module.exports.createUser = function (newUser, callback) {
     newUser.save(callback);
 };

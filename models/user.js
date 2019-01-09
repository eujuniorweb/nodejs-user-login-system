const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
     bcrypt.genSalt(10,function (error,salt) {
        bcrypt.hash(newUser.password,salt, function (error,hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
     });

 };

var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});

var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json('rota user');
});

router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Register'});
});

router.post('/register', upload.single('profileimage'), function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    if (req.file) {
        var profileimage = req.file.filename;
    } else {
        var profileimage = 'noimage.jpg';
    }
    ;

    //Form Validation

    req.checkBody('name', 'Campo Name Obrigatório!').notEmpty();
    req.checkBody('email', 'Campo Email Obrigatório!').notEmpty();
    req.checkBody('email', 'Email inválido!').isEmail();
    req.checkBody('username', 'Campo User Obrigatório!').notEmpty();
    req.checkBody('password', 'Campo Password Obrigatório!').notEmpty();
    req.checkBody('password2', 'Password e Confirmação Diferentes').equals(req.body.password);


    //Check erros
    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {errors: errors});
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            profileimage: profileimage
        });
        User.createUser(newUser, function (error, user) {
            if (error) throw error;
            console.log(user);
        });
        req.flash('card-panel lighten-4 text-darken-4 green green-text', 'You are now registered and can login');

        res.location('/');
        res.redirect('/');
    }
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login'});
});

module.exports = router;

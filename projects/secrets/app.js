require('dotenv').config();
const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption'); // level 2
// const md5 = require('md5'); // level 3
// const bcrypt = require('bcrypt'); //level 4
// const salt_rounds = 10; // level 4
const session = require('express-session'); // level 5
const passport = require('passport'); // level 5
const passport_local_mongoose = require('passport-local-mongoose'); // level 5

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(parser.urlencoded({extended: true}));

// level 5
// initialize session
app.use(session({
    secret: 'This is a secret for session.',
    resave: false,
    saveUninitialized: false
}));

// level 5
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/userDB');

// user schema
const user_schema = new mongoose.Schema({
    email: String,
    password: String
});

// level 5
// add passport-local-mongoose plugin to the mongoose schema
user_schema.plugin(passport_local_mongoose);

// level 2
// encrypt password field
// user_schema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

// user model
const User = mongoose.model('User', user_schema);

// level 5
// create a local login strategy
passport.use(User.createStrategy());

// level 5
// serialize and deserialize user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

// level 5
app.get('/secrets', (req, res) => {
    if(req.isAuthenticated()) {
        res.render('secrets');
    } else {
        res.redirect('login');
    }
});

// level 5
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// app.post('/register', async (req, res) => {
//     try {
//         const user = new User({
//             email: req.body.username,
//             // password: md5(req.body.password) // level 3
//             // password: await bcrypt.hash(req.body.password, salt_rounds) // level 4
//         });
    
//         await user.save();
//         res.render('secrets');
//     } catch(err) {
//         console.log(err);
//     }
// });

// level 5
// authentication using passport
app.post('/register', async (req, res) => {
    try {
        const user = await User.register({username: req.body.username}, req.body.password);
        passport.authenticate('local')(req, res, () => {
            res.redirect('/secrets');
        });
    } catch(err) {
        console.log(err);
        res.redirect('/register');
    }
});

// app.post('/login', async (req, res) => {
//     try {
//         const user = await User.findOne({email: req.body.username});
//         if(user) {
//             // level 3
//             // if(user.password == md5(req.body.password)) {
//             //     res.render('secrets');
//             // }
//             // level 4
//             // if(await bcrypt.compare(req.body.password, user.password)) {
//             //     res.render('secrets');
//             // }
//         }
//     } catch(err) {
//         console.log(err);
//     }
// });

// level 5
// authentication using passport
app.post('/login', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
    
        req.login(user, (err) => {
            if(err) {
                throw err;
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/secrets');
                });
            }
        });
    } catch(err) {
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000.');
});

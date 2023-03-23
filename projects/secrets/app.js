const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(parser.urlencoded({extended: true}));

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/userDB');

// user schema
const user_schema = new mongoose.Schema({
    email: String,
    password: String
});

// encrypt password field
const secret = 'Thisisourlittlesecret.';
user_schema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

// user model
const User = mongoose.model('User', user_schema);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const user = new User({
            email: req.body.username,
            password: req.body.password
        });
    
        await user.save();
        res.render('secrets');
    } catch(err) {
        console.log(err);
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.username});
        if(user) {
            if(user.password == req.body.password) {
                res.render('secrets');
            }
        }
    } catch(err) {
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000.');
});

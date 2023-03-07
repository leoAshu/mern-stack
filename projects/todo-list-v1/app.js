const express = require('express');
const parser = require('body-parser');
const date = require('./date');

const app = express();

app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(express.static('./public'));

const items = [
    'Buy Food',
    'Cook Food',
    'Eat Food'
];

app.get('/', (req, res) => {
    res.render('list', {
        day: date.today(),
        items: items
    });
});

app.post('/', (req, res) => {
    items.push(req.body.newItem);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('server is listening at port 3000');
});

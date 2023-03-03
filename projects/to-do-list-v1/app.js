const express = require('express');
const parser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(express.static('./public'));

let items = [
    'Buy Food',
    'Cook Food',
    'Eat Food'
];

app.get('/', (req, res) => {
    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    const day = new Date().toLocaleDateString('en-US',  dateOptions);

    res.render('list', {
        day: day,
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

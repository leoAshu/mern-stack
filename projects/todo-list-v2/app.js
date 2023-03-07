const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(express.static('./public'));

mongoose.connect('mongodb://localhost:27017/todolistDB');

// item schema object
const item_schema = mongoose.Schema({
  name: String
});
// item model object
const Item = mongoose.model('Item', item_schema);

const items = [];

app.get('/', (req, res) => {
    res.render('list', {
        // day: date.today(),
        day: 'Today',
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

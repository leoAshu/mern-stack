const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(express.static('./public'));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

// item schema object
const item_schema ={
  name: String
};
// item model object
const Item = mongoose.model('Item', item_schema);

app.get('/', (req, res) => {

  // fetch items from db
  Item.find()
  .then((items) => {
    console.log(items);
    res.render('list', {day: 'Today', items: items});
  }).catch((err) => {
    console.log(err);
  });
});

app.post('/', (req, res) => {
    items.push(req.body.newItem);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('server is listening at port 3000');
});

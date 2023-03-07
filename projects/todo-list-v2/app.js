const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(express.static('./public'));

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

// item schema object
const item_schema = {
  name: String
};
// item model object
const Item = mongoose.model('Item', item_schema);

// default items
const item1 = new Item({
  name: 'Welcome to your Todo List!'
});
const item2 = new Item({
  name: 'Hit the + button to add a new item.'
});
const item3 = new Item({
  name: '<-- Hit this to delete an item.'
});
const default_items = [item1, item2, item3];

// custom list schema
const list_schema = {
  name: String,
  items: [item_schema]
};
// custom list model
const List = mongoose.model('List', list_schema);

app.get('/', (req, res) => {
  // fetch items from db
  Item.find({})
  .then((items) => {

    if(items.length === 0) {
      Item.insertMany(default_items)
      .then(() => {
        console.log('Successfully saved default items to DB.')
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        res.redirect('/');
      });
    } else {
      res.render('list', {title:'Today', items: items});
    }
  }).catch((err) => {
    console.log(err);
    res.render('list', {title:'Today', items: []});
  });

});

app.get('/:customListName', (req, res) => {
  const custom_list_name = req.params.customListName;

  const custom_list = new List({
    name: custom_list_name,
    items: default_items
  });

  List.findOne({name: custom_list_name})
  .then((list) => {

    if(!list) {
      custom_list.save()
      .then(() => {
        res.redirect(`/${custom_list_name}`);
      });
    } else {
      res.render('list', {title:custom_list_name, items: list.items});
    }
  }).catch((err) => {
    console.log(err);
    res.render('list', {title:custom_list_name, items: []});
  });

});

app.post('/', (req, res) => {
  const item_name = req.body.newItem;
  const list_name = req.body.list;

  const new_item = new Item({
    name: item_name
  });

  if(list_name === 'Today') {
    new_item.save().then(() => {
      res.redirect('/');
    });
  } else {
    List.findOne({name: list_name})
    .then((list) => {
      list.items.push(new_item);
      list.save();
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      res.redirect(`/${list_name}`)
    });
  }

});

app.post('/delete', (req, res) => {
  Item.findByIdAndRemove(req.body.item_id)
  .then(() => {
    console.log('Successfully deleted item from DB.');
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => {
    console.log('Server is listening at port 3000.');
});

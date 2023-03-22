const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const article_schema = {
    title: String,
    content: String
};
const Article = mongoose.model('Article', article_schema);



app.listen(3000, () => {
    console.log('Server started on port 3000.')
});

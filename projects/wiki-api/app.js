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

app.route('/articles')
.get(async (req, res) => {
    try {
        const articles = await Article.find({});
        res.send(articles);
    } catch(err) {
        res.send(err);
    }
})
.post(async (req, res) => {
    try {
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });

        await article.save();
        res.send('Success!');
    } catch(err) {
        res.send(err);
    }
})
.delete(async (req, res) => {
    try {
        await Article.deleteMany({});
        res.send('Success!');
    } catch(err) {
        res.send(err);
    }
});

app.route('/articles/:article_title')
.get(async (req, res) => {
    try {
        const article = await Article.findOne({title: req.params.article_title});
        res.send(article);
    } catch(err) {
        res.send(err);
    }
})
.put(async (req, res) => {
    try {
        await Article.updateOne(
            {title: req.params.article_title},
            {title: req.body.title, content: req.body.content},
        );
        res.send('Success!');
    } catch(err) {
        res.send(err);
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000.')
});

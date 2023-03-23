const express = require('express');
const parser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(parser.urlencoded({extended: true}));



app.listen(3000, () => {
    console.log('Server started on port 3000.');
});

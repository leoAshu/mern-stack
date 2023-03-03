const express = require('express');
const parser = require('body-parser');

const app = express();
app.use(parser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    var today = new Date();
    var currentDay = today.getDay();
    var day = '';

    if(currentDay === 6 || currentDay === 0)
        day = 'Weekend';
    else
        day = 'Work day';
    
    res.render('list', {day: day});
});

app.listen(3000, () => {
    console.log('server is listening at port 3000');
});

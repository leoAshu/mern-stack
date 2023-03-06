const mongoose = require('mongoose');

// connection URL
const url = 'mongodb://127.0.0.1:27017';

// database Name
const db_name = 'fruitsDB';

// collection name: singular
// automatically converted to plural
const collection_name = 'fruit';

mongoose.connect(url + '/' + db_name)
.then(() => {
    console.log('Connected to db.');
}).catch((err) => {
    return err;
});

const fruit_schema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model(collection_name, fruit_schema);

const fruit = new Fruit({
    name: 'Apple',
    rating: 7,
    review: 'Pretty solid as a fruit.'
});

fruit.save().then(async () => {
    console.log('saved document to collection');
    await mongoose.disconnect();
    console.log('db disconnected');
});

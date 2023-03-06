const mongoose = require('mongoose');

// connection URL
const url = 'mongodb://127.0.0.1:27017';

// database Name
const db_name = 'fruitsDB';


// collection name: singular
// automatically converted to plural
const fruits_collection_name = 'fruit';
// fruit schema
// validation rules
// const fruit_schema = new mongoose.Schema({
//     name: String,
//     rating: Number,
//     review: String
// });

// fruit schema with validation rules
const fruit_schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please check your data entry, no name specified!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});
// fruit model
const Fruit = mongoose.model(fruits_collection_name, fruit_schema);


//collection name
const people_collection_name = 'person';
// person schema
// const person_schema = mongoose.Schema({
//     name: String,
//     age: Number
// });

// person schema with relationship to another schema
const person_schema = mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruit_schema
});
// person model
const Person = mongoose.model(people_collection_name, person_schema);


// function to save a fruit document to fruits collection
async function save_fruit(name, rating, review) {
    const fruit = new Fruit({
        name: name,
        rating: rating,
        review: review
    });

    await fruit.save();
    console.log(`saved fruit to db`);
}

// find fruits
async function find_fruits() {
    const fruits = await Fruit.find();
    console.log(fruits);
}


// function to save a person document to people collection
async function save_person(name, age) {
    const person = new Person({
        name: name,
        age: age
    });
    
    await person.save();
    console.log(`saved person to db`);
}
// find people
async function find_people() {
    const people = await Person.find();
    console.log(people);
}

async function embed_and_save() {
    const pineapple = new Fruit({
        name: 'Pineapple',
        rating: 9,
        review: 'Great fruit.'
    });
    await pineapple.save();

    const person = new Person({
        name: 'Amy',
        age: 12,
        favouriteFruit: pineapple
    });
    await person.save();
    console.log('saved embedded document to db');
}

async function main() {
    try {
        await mongoose.connect(url + '/' + db_name);
        console.log(`connected to ${db_name}`);

        // fruits collection
        // await save_fruit('Apple', 7, 'Pretty solid as a fruit.');
        await find_fruits();
        
        // embedded or related schema
        // fruit schema inside person schema
        await embed_and_save();

        // people collection
        // await save_person('Mary', 25);
        await find_people();
        
    } catch(err) {
        console.log(err);
    } finally {
        await mongoose.disconnect();
        console.log('db disconnected');
    }; 
}

main();

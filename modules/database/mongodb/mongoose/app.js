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
        required: true
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
const person_schema = mongoose.Schema({
    name: String,
    age: Number
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

async function main() {
    try {
        await mongoose.connect(url + '/' + db_name);
        console.log(`connected to ${db_name}`);

        // fruits collection
        // await save_fruit('Apple', 7, 'Pretty solid as a fruit.');
        await find_fruits();
        
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

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url);

async function main() {
    // Use connect method to connect to the Server
    await client.connect();
    console.log('Connected successfully to the server');
    const db = client.db(dbName);

    return 'done';
}

main()
.then(console.log)
.catch(console.error)
.finally(() => client.close())



const { MongoClient } = require('mongodb'); // From node modules
const config = require('./dbConfig.json');  // Import dbConfig.json

// Creates full URL using dbConfig.json file
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);  // Create a client of mongoDB
const db = client.db('startup');   // Database folder (within cluster0)
const collection = db.collection('users');  // Grab a *file* from mongoDB called house (house database)
// This file goes within the rental/ folder

async function main() {
  try {
    // add all the following database code here - MAGIC HERE

    // POST
    // Example: Create user code here,
    // const house = {
    //     name: 'Beachfront views',
    //     summary: 'From your bedroom to the beach, no shoes required',
    //     property_type: 'Condo',
    //     beds: 1,
    // };
    // const user = {name: 'Mason'};
    // const insertResult = await collection.insertOne(house);
    // const insertStartup = await startup_collection.insertOne(user);
    // console.log(insertResult)
    // console.log(insertStartup)

    // PUT
    // const query = { _id: '6aea57bc94180a82eca0fda8' };
    const query = { property_type: 'Condo', beds: { $lt: 2 } };
    await collection.updateMany(query, { $set: { beds: 2 } });
    
  } finally {
    client.close();
  }
}

main();

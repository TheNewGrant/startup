const { MongoClient } = require('mongodb'); // From node modules
const config = require('./dbConfig.json');  // Import dbConfig.json

// Creates full URL using dbConfig.json file
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);  // Create a client of mongoDB
const db = client.db('startup');   // Database folder (within cluster0)
const collection = db.collection('users');  // Grab a *file* from mongoDB 

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();
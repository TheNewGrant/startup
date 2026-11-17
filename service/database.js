const { MongoClient } = require('mongodb'); // From node modules
const config = require('./dbConfig.json');  // Import dbConfig.json

// Creates full URL using dbConfig.json file
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);  // Create a client of mongoDB
const db = client.db('startup');   // Database folder (within cluster0)
const userCollection = db.collection('users'); 
const scoreCollection = db.collection('scores'); 
// User collection is just user information, score information includes individual
// games with their scores and the user attached to them

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

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function addScore(score) {
  return scoreCollection.insertOne(score);
}

// This gets the highest scores of every user
function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

// This gets the highest scores of the current user
function getUserHighScores(user) {
  const query = { score: { $gt: 0, $lt: 900 }, name: user };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  addScore,
  getHighScores,
  getUserHighScores,
};

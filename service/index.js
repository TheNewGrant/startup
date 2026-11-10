// Import statements:
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// Store users in memory
let users = [];

// Set the port of this service to 4000
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// --- MIDDLEWARE ---
// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// --- ROUTES ---
// Create a router for API routes
var apiRouter = express.Router();
app.use('/api', apiRouter);

// Create a user registration route
apiRouter.post('/auth/create', (req, res) => {
  // Implementation for user registration
});

// Login route
apiRouter.post('/auth/login', (req, res) => {
  // Implementation for user login
});

// Logout route
apiRouter.delete('/auth/logout', (req, res) => {
  // Implementation for user logout
});

// Custom middleware to check if the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {

};

// --- BASE CASES --- 
// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Default webpage if file path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


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


const port = process.argv.length > 2 ? process.argv[2] : 4000;
// Import statements:
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

app.use(express.static('public'));

const authCookieName = 'token';

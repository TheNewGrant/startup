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
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    }
});

// Login route
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({ email: user.email });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// Logout route
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
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



// --- LISTENER ---
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
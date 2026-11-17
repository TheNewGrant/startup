// --- IMPORTS ---
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const DB = require('./database.js');
const app = express();

const authCookieName = 'token';

// Store users in memory
let users = [];
let scores = [];

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
app.use(`/api`, apiRouter);

// Create a user route
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
// This will be used for displaying scores
//   This middle ware sits here so express will not continue to score endpoints
//   unless the user is authorized
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// --- BASE CASES --- 
// GetScores: the ten highest current board scores across all users.
apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.send(scores.slice(0, 10));
});

// GetMyScores: all saved boards belonging to the authenticated user.
apiRouter.get('/scores/me', verifyAuth, (req, res) => {
  const userScores = scores.filter((score) => score.name === req.user.email);
  res.send(userScores);
});

// SubmitScore: save the latest score for this user's board.
apiRouter.post('/score', verifyAuth, async (req, res) => {
  const score = req.body;
  if (!score || typeof score.id !== 'string' || !score.id || score.id.length > 100 ||
      !Number.isInteger(score.score) || score.score < 0 ||
      !Number.isInteger(score.fill) || score.fill < 0 || score.fill > 100 || score.fill % 4 !== 0 ||
      !Number.isInteger(score.bingos) || score.bingos < 0 || score.bingos > 12) {
    res.status(400).send({ msg: 'Invalid score' });
    return;
  }

  const newScore = {
    id: score.id,
    name: req.user.email,
    score: score.score,
    fill: score.fill,
    bingos: score.bingos,
    date: new Date().toLocaleDateString(),
  };

  try {
    await DB.updateScore(newScore);

    const scores = await DB.getHighScores(newScore);
    res.send(scores);
  } catch (err) {
    console.error('Failed to save score:', error);
    res.status(500).send({ msg: 'Unable to save score' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Default webpage if file path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// --- HELPER FUNCTIONS --- --- FOR USER MANAGEMENT ---

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

// Helper function to help find a value given a specific field
// returns the user associated with the field and value, or null if not found
async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// --- LISTENER ---
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

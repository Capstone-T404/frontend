// require('dotenv').config();
const { readFile } = require('fs').promises;
const express = require('express');
const router = express.Router();
const Data = [];
const knexConfiguration = require('./backend/knexfile.js');
const knex = require('knex')(knexConfiguration);
const cors = require('cors');
// const Timer = require("./Client/Timer");

const app = express();

// Cross Origin Resource configuration
// Accepted origins
const allowedOrigins = [
  'https://api.bneitconsulting.com', // CloudFront endpoint
  'http://localhost:3001', // SSH tunnel
  'http://localhost:80', // SSH tunnel
];

// CORS config
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS denied'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Apply CORS rules
app.use(cors(corsOptions));

app.use(express.json());

// Connect to DB on each request
app.use((req, res, next) => {
  req.db = knex;
  next();
});

// Endpoints for testing connection
app.use('/', require('./routes/hello'));
app.use('/events', require('./routes/events'));

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`API up on http://localhost:${PORT}`)
);

//Initial set up for playing around with
//################################################################################################
app.use(express.static('Client'));

/*app.get('/', async (request, response) => {
  response.send('welcome');
});
*/
app.post('/buttonClicked', (request, response) => {
  response.json({ message: 'Hello There' });
});

app.post('/newGameEvent', (request, response) => {
  const data = request.body;
  console.log(data);
  let gameEvent = createGameEvent(data.time, data.event, data.zone);
  console.log(gameEvent);
  response.json({ status: 200, message: gameEvent });
});

//################################################################################################

function createGameEvent(time, event, zone) {
  const gameEvent = {
    gameTime: time,
    gameEvent: event,
    gameZone: zone,
  };
  return gameEvent;
}


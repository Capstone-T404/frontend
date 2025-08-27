// require('dotenv').config();
const { readFile } = require('fs').promises;
const express = require('express');
const router = express.Router();
const Data = [];
const knexConfiguration = require('./knexfile.js');
const knex = require('knex')(knexConfiguration);
const cors = require('cors');
// const Timer = require("./Client/Timer");

const app = express();

// Cross Origin Resource configuration
// Accepted origins
const allowedOrigins = [
  'http://localhost:3001/', // SSH tunnel
  'http://localhost:80', // SSH tunnel
  'http://localhost:3002/'
];

// CORS config
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS denied for orgin:'+ origin));
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
app.use('/routes/events', require('./routes/events'));

const PORT = Number(process.env.PORT) || 3002;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`API up on http://localhost:${PORT}`)
);


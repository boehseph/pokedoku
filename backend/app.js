const express = require('express');
const cors = require('cors');

const gameRoutes = require('./routes/game');
const attemptsRoutes = require('./routes/attempts');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', gameRoutes);
app.use('/api', attemptsRoutes);
app.use('/api', authRoutes);

module.exports = app;

const express = require('express');
const app = express();
const path = require('path');
const heroRoutes = require('./routes/heroRoutes');

const errorHandler = require('./middleware/errorHandler');

const logger = require('./middleware/logger');
const heroModel = require("./models/heroModel");


app.use(express.json());
app.use(logger);

app.use('/heroes', heroRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join( './src/public', 'index.html'));
});

app.get('/heroes', (req, res) => {
    const allHeroes = heroModel.getAllHeroes();
    res.status(200).json(allHeroes);
});

app.get('/sync-error', (req, res) => {
    throw new Error('Synchronous error!');
});

app.get('/async-error', async (req, res, next) => {
    try {
        throw new Error('Async error!');
    } catch (err) {
        next(err);
    }
});

app.use(errorHandler);

module.exports = app;
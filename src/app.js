const express = require('express');
const app = express();
const path = require('path');

const heroRoutes = require('./routes/heroRoutes');

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

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({message: 'Something broke!'});
});

module.exports = app;
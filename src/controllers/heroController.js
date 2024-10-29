const heroModel = require('../models/heroModel.js');


exports.getAllHeroes = async (req, res) => {
    res.json(heroModel.getAllHeroes());
};

exports.getHero = async (req, res) => {
    const hero = heroModel.getHero(parseInt(req.params.id));

    if (hero) {
        res.json(hero);
    } else {
        res.status(404).json({ message: 'No hero found' });
    }
};

exports.createHero = async (req, res) => {
    const newHero = heroModel.createHero(req.body);
    res.status(201).json(newHero);
};

exports.updateHero = async (req, res) => {
    const updatedHero = heroModel.updateHero(parseInt(req.params.id), req.body);

    if (updatedHero) {
        res.json(updatedHero);
    } else {
        res.status(404).json({ message: 'No hero found' });
    }
};

exports.deleteHero = async (req, res) => {
    const deletedHero = heroModel.deleteHero(parseInt(req.params.id), req.body);

    if (deletedHero) {
        res.json(deletedHero);
    } else {
        res.status(404).json({ message: 'No hero found' });
    }
}
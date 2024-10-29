// import express
const express = require('express');
const router = express.Router();

// import heroController
const heroController = require('../controllers/heroController');

// define and connect routes
router.get('/', heroController.getAllHeroes);
router.get('/:id', heroController.getHero);
router.post('/', heroController.createHero);
router.put('/:id', heroController.updateHero);
router.delete('/:id', heroController.deleteHero);

// export router
module.exports = router;
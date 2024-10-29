const fs = require('fs');
const path = require('path');
const filePath = path.join('./src/models/', 'heroes.json');

let heroes = [];

const data = JSON.stringify(heroes);

// Load heroes from JSON file
const loadHeroes = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        heroes = JSON.parse(data);
    }
};

// Save heroes to JSON file
const saveHeroes = () => {
    fs.writeFileSync(filePath, JSON.stringify(heroes, null, 2));
};

loadHeroes();


module.exports = {

    getAllHeroes: () => heroes,

    getHero: id => heroes.find(hero => hero.id === id),


    //newHero.id = this.heroes.length ? this.heroes[this.heroes.length - 1].id + 1 : 1;

    createHero: hero => {
        hero.id = heroes.length ? heroes[heroes.length -1].id + 1 : 1;

        //hero.id = heroes.length + 1;
        heroes.push(hero);
        saveHeroes();

        return hero;
    },

    updateHero: (id, updatedHero) => {
        let index = heroes.findIndex(hero => hero.id === id);

        if (index !== -1) {
            heroes[index] = { ...heroes[index], ...updatedHero };
            saveHeroes();
            return heroes[index];
        }
    },

    deleteHero: id => {
        let index = heroes.findIndex(hero => hero.id === id);

        if (index !== -1) {
            const deletedHero = heroes.splice(index, 1);
            saveHeroes();
            return deletedHero;
        }
        return null;
    }
}
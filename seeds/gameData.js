const { Game } = require('../models');

const gamedata = [
  {
    court: 'Powderhorn',
    date: 'May 20',
    time: '17:00 EST',
    players:['Nicholas', 'Bijan', 'Dan', 'Davis'],
    creator: 'Nicholas',
  },
  {
    court: 'Mac-Groveland',
    date: 'May 23',
    time: '16:00 EST',
    players:['Nicholas', 'Bijan', 'Dan', 'Davis'],
    creator: 'Bijan',
  },
  {
    court: 'Pershing Park',
    date: 'May 19',
    time: '12:00 EST',
    players:['Nicholas', 'Bijan', 'Dan', 'Davis'],
    creator: 'Dan',
  },
];

const seedGame = () => Game.bulkCreate(gamedata);

module.exports = seedGame;

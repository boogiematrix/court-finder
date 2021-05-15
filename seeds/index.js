const sequelize = require('../config/connection');
const seedCourt = require('./courtData');
const seedGames = require('./gameData');
const seedUser = require('./userData')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCourt();

  await seedGames();

  await seedUser();
  process.exit(0);
};

seedAll();

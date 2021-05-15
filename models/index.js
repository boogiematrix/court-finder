const User = require('./User');
const Court = require('./Court');
const Game = require('./Game');

User.belongsToMany(Game, { through: 'C' }); // A BelongsToMany B through the junction table C
Game.belongsToMany(User, { through: 'C', /* options */ });

User.hasMany(Court, { foreignKey: 'user_id'});
Court.belongsTo(User, { foreignKey: 'user_id'});

Court.hasMany(Game, { foreignKey: 'court_id', onDelete: 'CASCADE'});
Game.belongsTo(Court, { foreignKey: 'court_id'});

module.exports = { User, Project };
const User = require('./User');
const Court = require('./Court');
const Game = require('./Game');
const Player = require('./Player')

User.belongsToMany(Game, {
    through: {
        model: Player,
        unique: false,
    },
    as: 'roster'
});

Game.belongsToMany(User, {
    through: {
        model: Player,
        unique: false,
    },
    as: 'user_games'
});

User.hasMany(Court, {
    foreignKey: 'user_id'
});

Court.belongsTo(User, {
    foreignKey: 'user_id'
});

Court.hasMany(Game, {
    foreignKey: 'court_id',
    onDelete: 'CASCADE',
});

Game.belongsTo(Court, {
    foreignKey: 'court_id'
});

module.exports = { User, Court, Game, Player };
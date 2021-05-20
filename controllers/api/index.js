const router = require('express').Router();

const userRoutes = require('./user-routes');
const gameRoutes = require('./game-routes');
const courtRoutes = require('./court-routes');

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/courts', courtRoutes);

module.exports = router;
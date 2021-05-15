const router = require('express').Router();

const userRoutes = require('./user-routes');
const gameRoutes = require('./game-routes');
const courtRoutes = require('./court-routes');

router.use('/user-routes', userRoutes);
router.use('/game-routes', gameRoutes);
router.use('/court-routes', courtRoutes);

module.exports = router;
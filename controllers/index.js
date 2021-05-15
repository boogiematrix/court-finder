//this is from mini-project
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/user-routes');
const gameRoutes = require('./api/game-routes');
const courtRoutes = require('./api/court-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/user-routes', userRoutes);
router.use('/game-routes', gameRoutes);
router.use('/court-routes', courtRoutes);

module.exports = router;

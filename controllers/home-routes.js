const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Game, Court, User, Player } = require('../models/')
//GET '/' for homepage display all courts nearby
router.get('/', async (req, res) => {
    try {
        const courtData = await Court.findAll({
            include: [User, Game],
            subQuery: false,
        });

        if (!courtData) {
            res.status(403).json();
            return;
        }
        const court = courtData.map((court) => court.get({ plain: true }));
        console.log(court)
        console.log(court[0].games.length)
        res.render('homepage', {
            court,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    };

});
//GET '/login'
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
        })
    } else {
        res.render('login')
    }
});
//GET '/signup'
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
        });
    } else {
        res.render('login')
    }
});
//GET individual court view
router.get('/courts/:id', async (req, res) => {
    try {
        const courtData = await Court.findByPk(req.params.id, {
            include: {
                model: Game,
                include: {
                    model: User,
                    as: 'user_games'
                }
            },
            subQuery: false,
        });

        if (courtData) {
            const court = courtData.get({ plain: true });
            console.log(court);
            console.log(court.games[0].user_games)
            res.render('onecourt', {
                court,
                loggedIn: req.session.loggedIn,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
//GET games by court view
 /*router.get('/games/:court_id', async (req, res) => {
    try {
        const gameData = await Court.findByPk({
            include: [Game],
        }, {
            where: {
                id: req.params.court_id,
            },
        });

        if (gameData) {
            const game = gameData.get({ plain: true });
            console.log(game);
            res.render('onecourt', {
                game,
                loggedIn: req.session.loggedIn,
        })
            } else {
                res.status(404).json({ message: 'No game found at this court!' });     
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})*/
//GET one game
router.get('/games/:id', async (req, res) => {
    try {
        const gameData = await Game.findByPk(req.params.id, {
            include: [Court],
            subQuery: false,
        });

        if (gameData) {
            const game = gameData.get({ plain: true });

            res.render('onegame', {
                game,
                loggedIn: req.session.loggedIn,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
//GET user's games view
router.get('/games/:user_id', withAuth, async (req, res) => {
    try {
        const gameData = await Game.findAll({
            include:  [User],
            where: {
                user_id: req.session.user_id
            }
        })
        if (!gameData) {
            res.status(404).json();
        }
        const game = gameData.map((game) => game.get({ plain: true }));
        res.render('usergames', {
            game,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})
//GET add court
router.get('/newcourt', withAuth, (req, res) => {
    res.render('newcourt', {
        loggedIn: req.session.loggedIn,
    });
    return;
})
//GET update court
router.get('/updatecourt/:id', withAuth, async (req, res) => {
    try {
        const courtData = await Court.findByPk(req.params.id);

        if (courtData) {
            const court = courtData.get({ plain: true });

            res.render('updatecourt', {
                court,
                loggedIn: req.session.loggedIn,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
//GET add game
router.get('/newgame', withAuth, (req, res) => {
    res.render('newgame', {
        loggedIn: req.session.loggedIn,
    });
    return;
})
//GET update game
router.get('/updategame/:id', withAuth, async (req, res) => {
    try {
        const gameData = await Game.findByPk(req.params.id);

        if (gameData) {
            const game = gameData.get({ plain: true });

            res.render('updategame', {
                game,
                loggedIn: req.session.loggedIn,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router
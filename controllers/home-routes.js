const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Game, Court, User, Player } = require('../models/')
//GET '/' for homepage display all courts nearby
router.get('/', async (req, res) => {
    try {
        const courtData = await Court.findAll({
            include: [User],
            subQuery: false,
        });

        if (!courtData) {
            res.status(403).json();
            return;
        }
        const court = courtData.map((court) => court.get({ plain: true }));
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
        res.render('dashboard', {
            loggedIn: req.session.loggedIn,
        })
    } else {
        res.render('login')
    }
});
//GET '/signup'
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.render('dashboard', {
            loggedIn: req.session.loggedIn,
        });
    } else {
        res.render('signup')
    }
});
//GET individual court view
//GET games by court view
//GET one game
//GET user's games view
//GET add court
//GET update court
//GET add game
//GET update game
const router = require('express').Router();
const { User, Player } = require('../../models');
const withAuth = require('../../utils/auth')

//TODO add join a game route

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post('/join', withAuth, async (req, res) => {
    try {
        const playerData = await Player.findOne({
            where: {
                user_id: req.session.user_id,
                game_id: req.body.game_id
            }
        })
        console.log(playerData)
        if (!playerData) {
            const newPlayer = await Player.create({
                user_id: req.session.user_id,
                game_id: req.body.game_id
            });
            res.status(200).json(newPlayer);
            return
        }
        res.status(400).json({ message: "You've already joined this game" })
        return;
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router;

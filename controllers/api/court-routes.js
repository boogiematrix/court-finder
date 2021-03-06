const router = require('express').Router();
const withAuth = require('../../utils/auth');
const Court = require('../../models/Court');
const Game = require('../../models/Game')

//GET all courts
router.get('/', async (req, res) => {
    try {
        const courtData = await Court.findAll();
        res.status(200).json(courtData);
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET one court
router.get('/:id', async (req, res) => {
    try {
        const courtData = await Court.findByPk(req.params.id, {
            include: [Game]
        });
        if (!courtData) {
            res.status(404).json({ message: 'No court found with this id!' });
            return;
        }

        res.status(200).json(courtData);
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET courts near me with games and playerCount
router.get('/zip/:zip', async (req, res) => {
    try {
        const courtData = await Court.findAll({
            where: {
                zip: req.params.zip,
            },
        },
            {
                include: [Game]
            });
        if (!courtData) {
            res.status(404).json({ message: 'No courts nearby!' });
            return;
        }

        res.status(200).json(courtData);
    } catch (err) {
        res.status(500).json(err);
    }
})

//POST new court
router.post('/', withAuth, async (req, res) => {
    try {
        const courtData = await Court.create({
            address: req.body.address,
            hasLights: req.body.hasLights,
            user_id: req.session.user_id,
        });
        res.status(200).json(courtData);
    } catch (err) {
        res.status(400).json(err);
    }
})

//PUT update court info
router.put('/:id', withAuth, async (req, res) => {
    try {
        const courtData = await Court.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!courtData[0]) {
            res.status(404).json({ message: 'No court found with this id!' });
            return;
        };

        res.status(200).json(courtData)
    } catch (err) {
        res.status(400).json(err);
    }
})

//DELETE court
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const courtData = await Court.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!courtData) {
            res.status(404).json({ message: 'No court found with this id!' });
            return;
        }

        res.status(204).send()
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router
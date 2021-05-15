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

//GET courts near me with games and playerCount

//POST new court

//PUT update court info

//DELETE court
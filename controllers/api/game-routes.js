const router = require('express').Router();
const withAuth = require('../../utils/auth');
const Court = require('../../models/Court');
const Game = require('../../models/Game')
const User = require('../../models/User')
const Player = require('../../models/User')

//GET all games
router.get('/', async (req, res) => {
    try {
        const gameData = await Game.findAll();
        res.status(200).json(gameData);
    } catch (err) {
        res.status(500).json(err);
    }
});
  
//GET a game by id
router.get('/:id', async (req, res) => {
    try {
        const gameData = await Game.findByPk(req.params.id, {
            include: [Court],
        }
        );

        if (!gameData) {
            res.status(404).json({ message: 'No game found with this id!' });
            return;
        };

        res.status(200).json(gameData)
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET games by court
//Calling in Court model??
router.get('/court/:court_id', async (req, res) => {
  try {
      const gameData = await Game.findAll({
        include:[Court],
      }, {
          where: {
              court_id: req.params.court_id,
          },
      });

      if (!gameData) {
          res.status(404).json({ message: 'No game found at this court!' });
          return;
      };

      res.status(200).json(gameData)
  } catch (err) {
      res.status(400).json(err);
  }
})
//FUTURE PLAN GET games by user (with some kind of friend system)
//POST new game
router.post('/', async (req, res) => {
  try {
      const gameData = await Game.create(req.body);
      res.status(200).json(gameData);
  } catch (err) {
      res.status(400).json(err);
  }
})
//PUT update game 
router.put('/:id', async (req, res) => {
  try {
      const gameData = await Game.update(req.body, {
          where: {
              id: req.params.id,
          },
      });

      if (!gameData[0]) {
          res.status(404).json({ message: 'No game found with this id!' });
          return;
      };

      res.status(200).json(gameData)
  } catch (err) {
      res.status(400).json(err);
  }
})
//DELETE game
router.delete('/:id', async (req, res) => {
  try {
      const gameData = await Game.destroy({
          where: {
              id: req.params.id
          }
      });

      if (!gameData) {
          res.status(404).json({ message: 'No game found with this id!' });
          return;
      }

      res.status(204).send()
  } catch (err) {
      res.status(500).json(err);
  }
})

module.exports = router
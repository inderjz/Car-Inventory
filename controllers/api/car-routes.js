const router = require('express').Router();
const { User, Car, Comment, Vote } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Get all cars
router.get('/', (req, res) => {
    Car.findAll({
        attributes: [
            'id',
            'name',
            'car_model',
            'price_paid',
            'resell_value',
            'notes',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE car.id = vote.car_id)'), 'vote_count']
          ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'car_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            },
          ]
    })
      .then(dbCarData => res.json(dbCarData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get car by ID
router.get('/:id', (req, res) => {
    Car.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'car_model',
            'price_paid',
            'resell_value',
            'notes',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE car.id = vote.car_id)'), 'vote_count']
          ],
        include: [
            {
                model: User,
                attributes: ['username']
              },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'car_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            }
          ]

    })
      .then(dbCarData => {
        if (!dbCarData) {
          res.status(404).json({ message: 'No Car found with this id' });
          return;
        }
        res.json(dbCarData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Post Car
router.post('/', withAuth, (req, res) => {
    Car.create({
      name: req.body.name,
      car_model: req.body.car_model,
      price_paid: req.body.price_paid,
      resell_value: req.body.resell_value,
      notes: req.body.notes,
      user_id: req.session.user_id
    })
    .then(dbCarData => res.json(dbCarData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

//Car voting route
router.put('/upvote', withAuth, (req, res) => {
    if (req.session) {
      Car.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });

// Update Cars
// router.put('/:id', withAuth, (req, res) => {
//     Car.update(req.body, {
//         individualHooks: true,
//         where: {
//             id: req.params.id
//       }
//     })
//       .then(dbCarData => {
//         if (!dbCarData[0]) {
//           res.status(404).json({ message: 'No Car found with this id' });
//           return;
//         }
//         res.json(dbCarData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });

// Delete Cars
router.delete('/:id', withAuth, (req, res) => {
    Car.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCarData => {
        if (!dbCarData) {
          res.status(404).json({ message: 'No Car found with this id' });
          return;
        }
        res.json(dbCarData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Car, User, Vote, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all Cars for /inventory
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    Car.findAll({
        where: {
          user_id: req.session.user_id
          },
        attributes: [
          'id',
          'name',
          'car_model',
          'price_paid',
          'resell_value',
          'notes',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE card.id = vote.car_id)'), 'vote_count']
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
          }
        ]
      })
        .then(dbCarData => {
          const whiskeys = dbCarData.map(car => car.get({ plain: true }));
          res.render('inventory', {cars, loggedIn: true});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });

// Get car by ID
router.get('/car/:id', (req, res) => {
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
        }
      ]
    })
      .then(dbCarData => {
        if (!dbCarData) {
          res.status(404).json({ message: 'No car found with this id' });
          return;
        }

        const car = dbCarData.get({ plain: true });

        res.render('single-car', {
            car,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

  module.exports = router;
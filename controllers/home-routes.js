const router = require('express').Router();
const sequelize = require('../config/connection');
const { Car, User, Vote, Comment } = require('../models');

// Get all Cars render homepage
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
        }
      ]
    })
      .then(dbCarData => {
        const cars = dbCarData.map(car => car.get({ plain: true }));
        res.render('homepage', {
            cars,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

// Signup
  // router.get('/signup', (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  //   }
  //   res.render('signup');
  // });

// Get all Cars for /car extension 
  // router.get('/car', (req, res) => {
  //   Car.findAll({
  //       attributes: [
  //           'id',
  //           'name',
  //           'bottle_size',
  //           'price_paid',
  //           'resell_value',
  //           'user_id',
  //           'notes',
  //           [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE car.id = vote.car_id)'), 'vote_count']
  //       ],
  //       include: [
  //         {
  //           model: Comment,
  //           attributes: ['id', 'comment_text', 'car_id', 'user_id', 'created_at'],
  //           include: {
  //             model: User,
  //             attributes: ['username']
  //           }
  //         },
  //         {
  //           model: User,
  //           attributes: ['username']
  //         }
  //       ]
  //     })
  //       .then(dbCarData => {
  //         const cars = dbCarData.map(car => car.get({ plain: true }));
  //         res.render('car', {
  //             cars,
  //             loggedIn: req.session.loggedIn
  //           });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         res.status(500).json(err);
  //       });
  // });

// Get all Cars for /browse (for future development)
  // router.get('/browse', (req, res) => {
  //   Car.findAll({
  //       attributes: [
  //         'id',
  //         'name',
  //         'car_model',
  //         'price_paid',
  //         'resell_value',
  //         'user_id',
  //         'notes',
  //         [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE car.id = vote.car_id)'), 'vote_count']
  //       ],
  //       include: [
  //         {
  //           model: Comment,
  //           attributes: ['id', 'comment_text', 'car_id', 'user_id', 'created_at'],
  //           include: {
  //             model: User,
  //             attributes: ['username']
  //           }
  //         },
  //         {
  //           model: User,
  //           attributes: ['username']
  //         }
  //       ]
  //     })
  //       .then(dbCarData => {
  //         const cars = dbCarData.map(car => car.get({ plain: true }));
  //         res.render('browse', {
  //             cars,
  //             loggedIn: req.session.loggedIn
  //           });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         res.status(500).json(err);
  //       });
  // });


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
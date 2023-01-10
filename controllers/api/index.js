const router = require('express').Router();

const userRoutes = require('./user-routes');
const carRoutes = require('./car-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/car', carRoutes);

module.exports = router;
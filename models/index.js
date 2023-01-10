const User = require('./User');
const Car = require('./Car');
const Comment = require('./Comment');
const Vote = require('./Vote');

User.hasMany(Car, {
    foreignKey: 'user_id'
});

Car.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Car, {
    through: Vote,
    as: 'voted_car',
    foreignKey: 'user_id'
});

Car.belongsToMany(User, {
    through: Vote,
    as: 'voted_car',
    foreignKey: 'car_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Vote.belongsTo(Car, {
    foreignKey: 'car_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Car.hasMany(Vote, {
    foreignKey: 'car_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Comment.belongsTo(Car, {
    foreignKey: 'car_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Car.hasMany(Comment, {
    foreignKey: 'car_id'
});

module.exports = {User, Car, Vote, Comment};
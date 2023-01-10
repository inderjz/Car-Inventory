const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { truncate } = require('./User');

// create our Post model
class Car extends Model {
    static upvote(body, models) {
        return models.Vote.create({
          user_id: body.user_id,
          car_id: body.car_id
        }).then(() => {
          return Car.findOne({
            where: {
              id: body.car_id
            },
            attributes: [
                'id',
                'name',
                'car_model',
                'price_paid',
                'resell_value',
                'user_id',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE car.id = vote.car_id)'), 'vote_count']
            ]
          });
        });
      }
    }

// create fields/columns for Post model
Car.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      // limiting the number of preselected
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      car_model: {
          type: DataTypes.TEXT,
          allowNull: truncate
      },
      price_paid: {
          type: DataTypes.FLOAT,
          allowNull: true
      },
      resell_value: {
          type: DataTypes.FLOAT,
          alllowNull: true
      },
      notes: {
          type: DataTypes.TEXT,
          allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'car'
    }
  );

  module.exports = Car;
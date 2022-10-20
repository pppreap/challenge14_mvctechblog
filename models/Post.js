const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

//define tables and columns and specifications
Post.init(
  {
      //defining each column
      id: {
          type:DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      title: {
          type:DataTypes.STRING,
          allowNull: false,
      },
      post_text: {
          type:DataTypes.STRING,
          allowNull: true,
      },
      user_id: {
        type:DataTypes.INTEGER,
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
  modelName: 'post'
}
);

module.exports= Post;
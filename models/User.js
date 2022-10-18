const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


//create User model
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync (loginPw, this.password);
    }
}

//define tables and columns and specifications
User.init(
    {
        //defining each column
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type:DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                isEmail:true
            }
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[5]
            }
        }
    },
 {
    hooks: {
        async beforeCreate(newUser) {
            newUser.password =await bcrypt.hash(newUser.password, 10);
            return newUser;
        },
        async beforeUpdate(updateUser) {
            updateUser.password =await bcrypt.hash(updateUser.password, 10);
            return updateUser;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
 }
);

module.exports= User;
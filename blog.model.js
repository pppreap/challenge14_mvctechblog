const { Sequelize, DataTypes } = require("sequelize");

...

const Blog = sequelize.define("Posts", {
   title: {
     type: DataTypes.STRING,
     allowNull: false
   },
   content: {
     type: DataTypes.STRING,
     allowNull: false
   },
   post_date: {
     type: DataTypes.DATEONLY,
   },
   comment: {
     type: DataTypes.STRING,
   }
});
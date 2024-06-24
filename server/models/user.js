const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user_masters', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  user.associate = (models) => {
    user.hasMany(models.task, {
      foreignKey: "userId",
      as: "tasks",
    });
  };

  return user;
};

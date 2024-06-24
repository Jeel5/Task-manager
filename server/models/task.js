module.exports = (sequelize, Sequelize) => {
    const task = sequelize.define('task_master', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title : {
            type: Sequelize.STRING,
            allowNull: false
        },
        description : {
            type: Sequelize.STRING,
        },
        startDate : {
            type: Sequelize.DATE,
            allowNull: false,
        },
        priority : {
            type: Sequelize.STRING,
            allowNull: false,
        },
        endDate : {
            type: Sequelize.DATE,
            allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER, 
          allowNull: false
        }
    });
    
    task.associate = models => {
        task.belongsTo(models.user, {
            foreignKey: 'userId',
            as : 'user'
        });
    }
  
    return task;
};
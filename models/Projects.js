const Sequelize = require('sequelize');

const ProjectSchema = Sequelize.define('projects',{
    projectName: {
        type: Sequelize.STRING,
        allowNull: false // required true
    },
    projectOwner: {
        type: Sequelize.STRING,
        allowNull: false // required true
    },
    manager: {
        type: Sequelize.STRING,
        allowNull: false // required true
    },
    involved: {
        type: Sequelize.STRING
    },
    downPaymen: {
        type: Sequelize.STRING,
        allowNull: false // required true
    },
    deadline: {
        type: Sequelize.STRING,
        allowNull: false // required true
    },
});
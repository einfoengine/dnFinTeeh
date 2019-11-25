const Sequelize = require('sequelize');
const db = require('../config/sequelize');

const ProjectSchema = db.define('Projects',{
    name: {
        type: Sequelize.STRING,
        required: true
    },
    client: {
        type: Sequelize.INTEGER,
        require: true,
    },
    amount: {
        type: Sequelize.STRING,
    },
    paid: {
        type: Sequelize.STRING,
    },
    // company: {
    //     type: Sequelize.STRING,
    //     // type: String,
    // },
});

module.exports = ProjectSchema;
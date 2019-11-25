const Sequelize = require('sequelize');
const db = require('../config/sequelize');

const UsersSchema = db.define('Client',{
    name: {
        type: Sequelize.STRING,
        required: true
    },
    email: {
        type: Sequelize.INTEGER,
        require: true,
    },
    pass: {
        type: Sequelize.STRING,
        require: true,
    },
    avatar: {
        type: Sequelize.STRING,
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
});
UsersSchema.sync();

module.exports = UsersSchema;
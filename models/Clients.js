const Sequelize = require('sequelize');
const db = require('../config/sequelize');

const ClientSchema = db.define('Client',{
    // id: {
    //     // type: DataTypes.UUID,
    //     primaryKey: true,
    //     // defaultValue: DataTypes.UUIDV4,
    //     allowNull: false
    // },
    name: {
        type: Sequelize.STRING,
        required: true
    },
    phone: {
        type: Sequelize.INTEGER,
        require: true,
    },
    email: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
        // require: true,
    },
    company: {
        type: Sequelize.STRING,
        // type: String,
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
});

module.exports = ClientSchema;
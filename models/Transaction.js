const Sequelize = require('sequelize');
const db = require('../config/sequelize');

class Transaction extends Model {}
Transaction.init({
  client: Sequelize.STRING,
  description: Sequelize.TEXT,
  operation: Sequelize.STRING,
  signeture: Sequelize.STRING,
}, { sequelize, modelName: 'Transaction' });

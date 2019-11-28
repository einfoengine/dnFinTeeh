const express = require('express');
const router = express.Router();
const db = require('../../config/sequelize');
const Transaction = require('../../models/Transaction');
const Projects = require('../../models/Projects');
const Clients = require('../../models/Clients');

Projects.hasMany(Transaction);
Transaction.belongsTo(Projects);

Transaction.sync();
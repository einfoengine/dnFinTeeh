const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
        require: true,
    },
    company: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Clients = mongoose.model('client', ClientSchema);
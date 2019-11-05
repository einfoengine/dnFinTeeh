const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    client: {
        type: String,
        require: true,
    },
    amount: {
        type: Number,
        required: true, 
    },
    paid: {
        type: Number, 
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Projects = mongoose.model('project', ProjectSchema);
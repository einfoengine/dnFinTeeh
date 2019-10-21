const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    pass: {
        type: String,
        required: true, 
    },
    avatar: {
        type: String, 
        
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Users = mongoose.model('user', UserSchema);
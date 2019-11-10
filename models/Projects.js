const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // client: {
    //     type: String,
    //     require: true,
    // },
    // client_id:{ 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Clients' 
    // },
    client:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client'
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

module.exports = Project = mongoose.model('Project', ProjectSchema);


// ***************


// import Clients from './Clients';
// const mongoose = require('mongoose');

// const ProjectSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     client: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Clients',
//         require: true,
//     }],
//     amount: {
//         type: Number,
//         required: true, 
//     },
//     paid: {
//         type: Number, 
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = Projects = mongoose.model('project', ProjectSchema);
const express = require('express');
var cors = require('cors');
const app = express();
const connectMG = require('./config/mongoDB');
const db = require('./config/sequelize');


// Establish connection
connectMG();
// sequelize();

// sequelize.authenticate

// Test DB
// const sequelizeAuth = async()=>{
//     try{
//         await sequelize.authenticate();
//         console.log('Success: Sequlize connection established!');
//     }catch(err){
//         console.error('Error:',err.message);
//     } 
// }

// Init middleware
// This allow us the get the data in request.body
app.use(cors());
app.use(express.json({
    extended: false,
}));
app.use('/', express.static('admin/dist'));

app.get('/', (req, res)=>{ 
    console.log(req )
    res.sendFile('./index.html');
});

// Define routes routes for 
app.use('/api/users', require('./routes/api/users_')); // Create new user
app.use('/api/auth', require('./routes/api/auth')); // Authenticate an user
app.use('/api/userlist', require('./routes/api/user_list_'));
app.use('/api/clients', require('./routes/api/clients'));
app.use('/api/projects', require('./routes/api/projects'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`I am active at port ${PORT}`);
})
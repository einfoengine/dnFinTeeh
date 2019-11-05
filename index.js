const express = require('express');
var cors = require('cors');
const app = express();
const connectMG = require('./config/mongoDB');
const connectSeq = require('./config/sequelize');


// Establish connection
connectMG();
connectSeq();

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
app.use('/api/users', require('./routes/api/users')); // Create new user
app.use('/api/auth', require('./routes/api/auth')); // Authenticate an user
app.use('/api/userlist', require('./routes/api/user_list'))

app.use('/api/projects', require('./routes/api/projects'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`I am active at port ${PORT}`);
})
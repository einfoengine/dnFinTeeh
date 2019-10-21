const express = require('express');
const app = express();
const connectMG = require('./config/mongoDB');
const connectSeq = require('./config/sequelize');


// Establish connection
connectMG();
connectSeq();

// Init middleware
app.use(express.json({
    extended: false,
}));

app.get('/', (req, res)=>{
    res.send(`I am working at port ${PORT}`);
});

// Define routes
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`I am active at port ${PORT}`);
})
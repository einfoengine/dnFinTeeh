const mongoose = require('mongoose');
const config = require('config');
const gravatar = require('gravatar');
const db = config.get("mongoURI"); 

// Connect mongo DB
const connectMG = async () => {
    try{
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected...');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
module.exports = connectMG;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('projects_schema', 'root', 'root', {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0, 
        acquire: 30000, //
        idle: 10000 //
    }
});


const sequelizeAuth = async()=>{
    try{
        await sequelize.authenticate();
        console.log('Success: Sequlize connection established!');
    }catch(err){
        console.error('Error:',err.message);
    }
}
// const project = connection.define();

module.exports = sequelizeAuth;
// Imports...
const mysql = require('mysql');

// Create Pool connection
const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'root',
    user: 'root',
    database: 'fin_book',
    host: 'localhost',
    port: '3306'
});

// Query object
let myQuery = {};

// Create new database
myQuery.createDb = ()=>{
    pool.query("CREATE DATABASE fin_book", (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result)
        }
    });
}

// Create new table
myQuery.createTable = (tableName, column_spec)=>{
    pool.query(`CREATE TABLE ${tableName}(${column_spec})`, (err, result) => {
        if(!err){
            console.log('Query successful...');
            console.log('************************************');
            console.log('Table name requested:');
            console.log(`CREATE TABLE ${tableName} \(${column_spec}\)`);
            console.log(result);
            console.log('************************************');
        }else{
            console.log('************************************');
            console.log('Table name requested:');
            console.log(`CREATE TABLE ${tableName} \(${column_spec}\)`);
            console.log(result);
            console.log('************************************');
            console.log('Error: '+ err);
        }
    });
}

// Create new record from endpoint params 
myQuery.create = (tableName, cols, vals)=>{
    console.log(`Insert data request to table: ${tableName} columns: ${col} values: ${val}`);
    return new Promise((resolve, reject)=>{
        pool.query(`INSERT INTO ${tableName} (${cols}) VALUES (${vals})`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else{
                return reject(err);
            }
        });
    });
}

// Fetch data from table
myQuery.fetchData = (tableName) => {
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM ${tableName}`, (err, result)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(result);
            }
        });
    });
}

module.exports = myQuery;
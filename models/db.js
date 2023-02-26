// const express = require('express') ; 
// const mysql = require('mysql2') ; 

// const pool = mysql.createPool({
//     host:"localhost" , 
//     user : "root" , 
//     password : "" , 
//     database: "" , 
//     connectionLimit:10
// }) ; 


// pool.query("SELECT * FROM student", (err, data , feilds) =>{
//     if(err){
//         console.error(err) ; 
//         return ; 
//     }
//     console.log(data) ; 
// })


const mysql = require('mysql2/promise');

// create a pool of connections to the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dialogflow',
  connectionLimit: 10 // maximum number of connections in the pool
});

// define a function to execute the query with dynamic parameters
async function getRowsByEntity(tableName, entityName) {
  const query = `SELECT * FROM ${tableName} WHERE ${entityName} = ?`;
  const [rows, fields] = await pool.query(query, [entityName]);
  return rows;
}

// example usage
const entityName = 'pepperoni'; // assume this is the entity's name returned from Dialogflow
const tableName = 'pizza'; // assume this is the table name corresponding to the entity
getRowsByEntity(tableName, entityName)
  .then((rows) => {
    console.log(rows);
    // do something with the query results
  })
  .catch((error) => {
    console.error(error);
    // handle the error
  });



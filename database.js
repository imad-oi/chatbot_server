const  {createPool} = require('mysql') ;

const pool = createPool({
    host:"localhost", 
    user :"root" ,
    password : "",
    database : "dialogflow" , 
    connectionLimit:12 
}) ; 

module.exports = pool ; 

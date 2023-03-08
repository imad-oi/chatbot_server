const  {createPool} = require('mysql') ;

const pool = createPool({
    host:"localhost", 
    user :"root" ,
    password : "",
    database : "chatbot" , 
    connectionLimit:12 
}) ; 

module.exports = pool ; 

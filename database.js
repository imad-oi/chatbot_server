const  {createPool} = require('mysql') ;
 // you have to create your own database 
const pool = createPool({
    host:"localhost", 
    user :"root" ,
    password : "",
    database : "chatbot" , 
    connectionLimit:12 
}) ; 

module.exports = pool ; 

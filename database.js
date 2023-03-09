const  {createPool} = require('mysql') ;

const pool = createPool({
    host:"localhost", 
    user :"root" ,
    password : "",
    database : "chatBotServ" , 
    connectionLimit:12 
}) ; 

module.exports = pool ; 

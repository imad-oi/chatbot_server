const express = require('express') ; 
const mysql = require('mysql2') ; 

const pool = mysql.createPool({
    host:"localhost" , 
    user : "root" , 
    password : "" , 
    database: "" , 
    connectionLimit:10
}) ; 


pool.query("SELECT * FROM student", (err, data , feilds) =>{
    if(err){
        console.error(err) ; 
        return ; 
    }
    console.log(data) ; 
})


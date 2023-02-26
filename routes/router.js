const express = require('express');
const router = express.Router();

const {traiterRequette} = require('../controller/chatbotController');

const middleWare = ( req , res , next)=>{
    console.log("imad ") ; 
    next() ; 
}

router.post('/api/chatbot', middleWare, ( req, res)=>{
    traiterRequette(req, res) ; 
});

module.exports = router ; 

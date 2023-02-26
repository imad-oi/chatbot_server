const express = require('express');
const router = express.Router();

const {traiterRequette} = require('../controller/chatbotController');

router.post('/api/chatbot', ( req, res)=>{
    traiterRequette(req, res) ; 
});

module.exports = router ; 

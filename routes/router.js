const express = require('express');
const router = express.Router();

const {traiterRequette} = require('../controller/chatbotController');

// const middleWare = ( req , res , next)=>{
//     console.log("imad ") ; 
//     next() ; 
// }

router.post('/api/chatbot', ( req, res)=>{
    traiterRequette(req, res) ; 
});

router.post('/api/transcribe', (req, res)=>{
    let data = req.body ; 
    console.log(data) ; 
    res.send('bien recu');
})

module.exports = router ; 
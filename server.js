const express = require('express'); 
const cors = require('cors')  ; 
const bodyParser = require('body-parser');
const router = require('./routes/router') ; 
const path = require('path') ; 

const app = express() ; 
app.use(cors());
app.use(bodyParser.json());

app.use(router)

app.get("/" , (req , res)=>{
    res.status(200).send({
        message:"hello from server"
    }) ;
    // res.sendFile(path.join(__dirname+'/pdf.html'))
})



app.listen(5000 , ()=>{ console.log('server started on port http://localhost:5000')});

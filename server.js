const express = require('express'); 
const cors = require('cors')  ; 
const bodyParser = require('body-parser');
const router = require('./routes/router') ; 
const path = require('path') ; 
const PDFDocument = require('pdfkit');
require('dotenv').config();

const app = express() ; 
app.use(cors());
app.use(bodyParser.json());

app.use(router)

app.get("/" , (req , res)=>{
    // res.status(200).send({
    //     message:"hello from server"
    // }) ;
    res.sendFile(path.join(__dirname+'/pdf.html'))
})

// app.get('/download-pdf', (req, res) => {
//     // create a new PDF document
//     const doc = new PDFDocument();
//     // set the PDF document's title
//     doc.info.Title = 'Releve de notes  ';
//     // write some text to the PDF document
//     doc.text('Releve de notes');
    
//     const table = {
//       headers: ['Name', 'Grade'],
//       rows: [
//         ['John', 'A'],
//         ['Mary', 'B'],
//         ['Tom', 'C']
//       ]
//     };
//     // add the table to the PDF document
//     // doc.table(table);
//     // set the HTTP headers to indicate that a PDF file should be downloaded
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename=releve_note.pdf');
//     // pipe the PDF document to the response stream
//     doc.pipe(res);
//     // finalize the PDF document
//     doc.end();
//   });



app.listen(5000 , ()=>{ console.log('server started on port http://localhost:5000')});

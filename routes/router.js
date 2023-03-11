const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit-table');

const {traiterRequette} = require('../controller/chatbotController');
const {getSharedData} = require('../services/sharedData');


// const middleWare = ( req , res , next)=>{
//     console.log("imad ") ; 
//     next() ; 
// }

router.post('/api/chatbot', ( req, res)=>{
    traiterRequette(req, res) ; 
});

router.post('/api/transcribe', (req, res)=>{
    let data = req.body ; 
    res.send('bien recu');
});


router.get('/download-pdf', (req, res) => {

    const data = getSharedData() ; 

    let tableArray = {
      headers: ["Module", "Moyenne Generale", "Barreme", "Resultat"],
      rows: [
        ["", "","",""],
        ["", "","",""],
        ["", "","",""],
        ["", "","",""],
        ["", "","",""],
        ["", "","",""],
      ],
      align: 'center' ,
    };

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      tableArray.rows[i + 1] = [row.nom_md, row.note, "/20","Valide" ];
    }

    
    let doc = new PDFDocument();
    const semestre = 'semestre 1' ; 
    
    doc.info.Title = 'Releve de notes  ';
    doc.moveDown();
    doc.text(`Releve de notes du ${semestre }`, {
      width: 410,
      align: 'center'
    }
);
    
    
    
    
    doc.moveDown();                             // separate tables
    doc.table( tableArray, { width: 300 });     // A4 595.28 x 841.89 (portrait) (about width sizes)
    doc.moveDown();                             // separate tables



    // add the table to the PDF document
    // doc.table(table);
    // set the HTTP headers to indicate that a PDF file should be downloaded
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=releve_note.pdf');
    // pipe the PDF document to the response stream
    doc.pipe(res);
    // finalize the PDF document
    doc.end();
  });

module.exports = router ; 
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit-table');

const {traiterRequette} = require('../controller/chatbotController');
const {getSharedData} = require('../services/sharedData');
const {getEtudiant}= require('../services/releverNotes');


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
    const code = process.env.CODE_APOGE ; 
    const dataShared = getSharedData() ; 
    const etudiant =getEtudiant(code);

/*     let tableArray = {
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
      const row = dataShared[i];
      tableArray.rows[i + 1] = [row.nom_md, row.note, "/20","Valide" ];
    }

    //structure de pdf
    let doc = new PDFDocument();

    //const semestre = 'semestre 1' ; 
    
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


 */
//############################################ releve de note structure pdf ####################
 // create a new PDF document
 const doc = new PDFDocument();
  
 // set the rectangle dimensions and position
 const rectWidth = 575.28;
 const rectHeight = 60;
 const rectPosX = 12;
 const rectPosY = 20;

 // set the text to display inside the rectangle
 const rectText1 = 'UNIVERSTÉ CADI AYYAD';
 const rectText2 = 'ANNÉE UNVIVERSITAIRE - XXXX/XXXX';//anne apartir de table semestre


 // add the rectangle, text, and single lines to the PDF document
 doc.rect(rectPosX, rectPosY, rectWidth, rectHeight)
    .stroke()
    .text(rectText1, rectPosX + 10, rectPosY + 10)

    .text(rectText2, 200, rectPosY + rectHeight / 2 + 10 , { align: 'center' });

    //fstg
    
     doc.fontSize(11)
    .text('FACULTÉ DES SCIENCES ET THECHNIQUES GUELIZ - MARRAKECH', rectPosX, rectPosY + rectHeight + 16)
    //relve de note
     .fontSize(16)
     .font('Times-Bold')
    .text('RELEVÉ DE NOTE', rectPosX + 200, rectPosY + rectHeight + 50)

     .fontSize(10)
    .text('NOM ET PRENOM :  '+ etudiant.nom + etudiant.prenom , rectPosX + 20, rectPosY + rectHeight + 80)// nom prenom

    .text('NUMERO APOGEÉ :'+etudiant.CODE_APOGE, rectPosX + 20, rectPosY + rectHeight + 100) // apoge
    .text('CNE :'+etudiant.cne, rectPosX + 20, rectPosY + rectHeight + 120) // cne 
    .text('DATE DE NAISSANCE :'+etudiant.dateNaissance, rectPosX + 20, rectPosY + rectHeight + 140) // date naissance 
    .text('inscret au '+semestre+etudiant.filiere, rectPosX + 20, rectPosY + rectHeight + 180) // semestre 
    .text('obtenu les notes suivantes :', rectPosX + 20, rectPosY + rectHeight + 200); 

//############################################"table "#####################################################################################
const tableTop = 300; // top margin of the table
const tableLeft = 20; // left margin of the table
const colWidth = 190; // width of each column
const rowHeight = 20; // height of each row
const numRows = 7; // total number of rows
const numCols = 3; // total number of columns

// Define the data to be displayed in the table
const tableDenote = [
 ['MODULE ', ' NOTE / BARREME ', 'RESULTAT '],
 ['', '', ''],
 ['', '', ''],
 ['', '', ''],
 ['', '', ''],
 ['', '', ''],
 ['', '', '']
];

for (let i = 1; i < tableDenote.length; i++) {
  const row = dataShared[i];
  tableDenote.rows[i + 1] = [row.nom_md, row.note + " /20","Valide" ];
}

// Loop through each row and column to draw the table
for (let i = 0; i < numRows; i++) {
 for (let j = 0; j < numCols; j++) {
   // Determine the x and y position of the current cell
   const x = tableLeft + j * colWidth;
   const y = tableTop + i * rowHeight;

   // Set the font size and style for the text
   doc.fontSize(10);
   doc.font('Helvetica-Bold');

   // Draw the cell border
   doc.rect(x, y, colWidth, rowHeight).stroke();

   // Draw the cell text
   doc.text(tableDenote[i][j], x + 5, y + 5);
 }
}
 doc
   .text('RESULTAT', rectPosX + 20, 450)
   .text('note semestre / 20', rectPosX + 210, 450)// note semestre 
   .text('valide', rectPosX + 400, 450);// etat
   //#######################
   doc.rect(421,477,40,16)
     .stroke()
       .text('2023',430,482);
   //(x,y,w,h)
//###########################################################################################################
   const imagePath = '/home/abdelfatah/Pictures/ucalogo.png';
   doc.image(imagePath,380,500 ,{width: 40,height:60},);
   doc.font('Helvetica');
   doc.fontSize(8);
   doc
   .text('CONVENTION :', 430,  506,{
     width: 120,
     font: 'Helvetica',
     fontSize: 6
   })
   .text('V : validé', 430, 518,{
     width: 120,
     font: 'Helvetica',
     fontSize: 6
   })
   .text('VAR : Validé Apres Rattrappage', 430,  530,{
     width: 120,
     font: 'Helvetica',
     fontSize: 6
   })
   .text('VAC : Validé par Compensation', 430,  542,{
     width: 120,
     font: 'Helvetica',
     fontSize: 6
   })
   .text('NV : non Validé', 430,  554,{
     width: 120,
     font: 'Helvetica',
     fontSize: 6
   });
   doc.font('Helvetica-Bold');
   doc.fontSize(8);

   doc.text('Le Doyen',100,570);
   const singDoy = '/home/abdelfatah/Pictures/aa.jpeg';
   doc.image(singDoy,90,585 ,{width: 60,height:30},);
   doc.text('Pr. Moha TAOURIRTE',78,620);

   //########################date de retriert
   doc.fontSize(7);
   doc.font('Helvetica');
   doc.text('Fait à Marrakech le xxxxx - xxxxx - xxxxx ',120,670)// sysdate
       .text('Le Doyen de la faculté des sciences et techniques de Marrakech',60,680)
       .text("vis important : il ne peut étre délivré qu''un seul exemplaire du présent relevé de note .Aucun duplicata ne sera fourni",130,710);
   

   


//###############################################################
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
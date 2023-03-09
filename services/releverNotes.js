const pool = require('../database')
const PDFDocument = require('pdfkit');
async function releverNoteSemestre(code_apoge,semestre){

}
releverNoteSemestre();
app.get('/download-pdf', (req, res) => {
    // create a new PDF document
    const doc = new PDFDocument();
    // set the PDF document's title
    doc.info.Title = 'My PDF Document';
    // write some text to the PDF document
    doc.text('Hello, world!');
    // set the HTTP headers to indicate that a PDF file should be downloaded
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=my-document.pdf');
    // pipe the PDF document to the response stream
    doc.pipe(res);
    // finalize the PDF document
    doc.end();
  });
  module.exports = {
    releverNoteSemestre
} ; 
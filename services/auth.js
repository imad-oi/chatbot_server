const pool = require('../database');

async function authentifier(code_apoge) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT nom, prenom FROM etudiant where code_apoge=${code_apoge}`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        const rowDataPacket = result[0];
        const nomEtudiant = rowDataPacket?.nom;
        const prenomEtudiant = rowDataPacket?.prenom;
        resolve({nomEtudiant,prenomEtudiant} );
      }
    });
  });
}

module.exports = {
     authentifier
} ; 
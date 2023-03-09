const pool = require("../database");
const id = Math.random() * (10000 - 1) + 1; //generate id
async function sauvgarderRendezVous(codeApoge, sujetRv) {
  return new Promise((resolve, reject) => {
    console.log("3aaa", id);

    pool.query(
      `insert into rendezVou values(${id},'${sujetRv}',${codeApoge},DATE_ADD(CURRENT_DATE, INTERVAL 1 day));`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const rowDataPacket = result;
          console.log(rowDataPacket.affectedRows);
          resolve(rowDataPacket);
        }
      }
    );
  });
}

sauvgarderRendezVous();

async function afficherRendezVous(codeApoge) {
  return new Promise((resolve, reject) => {
    const id = Math.random() * (10000 - 1) + 1; //generate id
    console.log("3aaa", id);

    pool.query(`select * form rendezVou where id=${id} and code_apoge_fk=${codeApoge}`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const rowDataPacket = result;
          console.log(rowDataPacket.affectedRows);
          resolve(rowDataPacket);
        }
      }
    );
  });
}

afficherRendezVous();
module.exports = {
  afficherRendezVous,sauvgarderRendezVous,
};
// user  : je veux demander un RV , rv , intent : demander_rv
// bot  : avec plisair, voici les sujets disponible [ static ] , que vous prefere ?

// intent2 : recuper_sujet_rv
//  7eme module
// bot :   votre sujet : $sujet_rv est enregistrer avec sucess

// insert into

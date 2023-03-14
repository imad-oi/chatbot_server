const pool = require("../database");



const number =Math.floor(Math.random() * 100); 

async function sauvgarderRendezVous(codeApoge, sujetRv) {
  return new Promise((resolve, reject) => {
    pool.query(
      `insert into renderVou (sujetRv , codeApoge , dateRv) values('${sujetRv}',${codeApoge},DATE_ADD(CURRENT_DATE, INTERVAL 1 day));`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const rowDataPacket = result;
          resolve(rowDataPacket);
        }
      }
    );
  });
}


async function afficherRendezVous(codeApoge) {
  return new Promise((resolve, reject) => {
    pool.query(`select * from rendervou  where id= ( select LAST_INSERT_ID() )`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const rowDataPacket = result[0];
          resolve(rowDataPacket);
        }
      }
    );
  });
}

module.exports = {
  afficherRendezVous,sauvgarderRendezVous,
};
// user  : je veux demander un RV , rv , intent : demander_rv
// bot  : avec plisair, voici les sujets disponible [ static ] , que vous prefere ?

// intent2 : recuper_sujet_rv
// user :  7eme module
// bot :   votre sujet : $sujet_rv est enregistrer avec sucess

// insert into

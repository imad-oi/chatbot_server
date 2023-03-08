const pool = require('../database');



async function cycleDispo() {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT distinct(cycle) FROM formation `, (error, result) => {
      if (error) {
        reject(error);
      } else {
        const rowDataPacket = result;
        resolve(rowDataPacket );
      }
    });
  });
}
cycleDispo();

async function formationDispo(cycle) {
  /* const typecycle = cycle; */
  return new Promise((resolve, reject) => {
    pool.query(`SELECT nom, lien FROM formation where cycle='${cycle}'`, (error, result) => {
      if (error) {
        reject(error);
      } else {

        console.log('27',result);
        const rowDataPacket = result;
        const nomFormation = rowDataPacket.nom;
        const linkFormation = rowDataPacket.lien;
        resolve(result);
      }
    });
  });
}


module.exports = {
    formationDispo ,cycleDispo,
};
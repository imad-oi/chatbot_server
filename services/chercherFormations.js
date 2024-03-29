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

async function formationDispo(cycle) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT nom, lien FROM formation where cycle='${cycle}'`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}


module.exports = {
    formationDispo ,cycleDispo,
};
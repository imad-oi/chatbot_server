const pool = require('../database');



async function formationDispo() {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM formation `, (error, result) => {
      if (error) {
        reject(error);
      } else {
        console.log("result of formation",result)
        const rowDataPacket = result[0];
        const nomFormation = rowDataPacket?.nom_Formation;
        const linkFormation = rowDataPacket?.link_Formation;
        resolve({nomFormation,linkFormation} );
      }
    });
  });
}
formationDispo();


module.exports = {
    formationDispo,
};
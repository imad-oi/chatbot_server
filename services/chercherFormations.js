const pool = require('../database');



async function cycleDispo() {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT distinct(cycle) FROM formation `, (error, result) => {
      if (error) {
        reject(error);
      } else {
        const rowDataPacket = result;
/*         console.log(typeof result);
 */
       // let cycles = [  rowDataPacket[0].cycle , 
       //                 rowDataPacket[1].cycle ,
       //                 rowDataPacket[2].cycle ,
       //                 rowDataPacket[3].cycle
       //               ];
/*         console.log(cycles);
 */        //console.log(rowDataPacket[0].cycle);
        //console.log(rowDataPacket[3].cycle);
        resolve({rowDataPacket} );
      }
    });
  });
}
cycleDispo();

async function formationDispo(cycle) {
  /* const typecycle = cycle; */
  return new Promise((resolve, reject) => {
    pool.query(`SELECT nom,link FROM formation where cycle='licence'`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        //console.log("result of formation",result)//test
        const rowDataPacket = result;
        //const nomFormation = rowDataPacket.nom;
        //const linkFormation = rowDataPacket.link;
        resolve({rowDataPacket} );
      }
    });
  });
}
formationDispo();

module.exports = {
    formationDispo ,cycleDispo,
};
const pool = require('../database')

async  function getNoteAndModulesOfSemestre(code_apoge, semestre){
  return new Promise((resolve, reject) => {
    pool.query(`SELECT note, nom_md, etat from note_module where code_apoge='${code_apoge}' and nom_md in (select nom_md from module where nom_sm='${semestre}' )`, (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        console.log(result)
        resolve(result);
      }
     });
    });
}

async  function getEtudiant(code_apoge){
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * from etudiant where code_apoge='${code_apoge}' `, (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(result[0]);
      }
     });
    });
}
async  function getSemestre(code_apoge,semestre){
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * from note_semestre where code_apoge='${code_apoge}' and nom_sm = '${semestre}'`, (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(result[0]);
      }
     });
    });
}






async function insertIntoReleve(codeApoge, semestre ) {
  return new Promise((resolve, reject) => {
    pool.query(
      `insert into releve_note (date , code_apoge , semesstre) values (DATE_ADD(CURRENT_DATE, interval 0 day ), '${codeApoge}','${semestre}')`,
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


  module.exports = {  getNoteAndModulesOfSemestre, getEtudiant ,getSemestre ,
    
     insertIntoReleve 
  
  } ; 
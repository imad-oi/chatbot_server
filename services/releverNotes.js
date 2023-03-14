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
// getNoteAndModulesOfSemestre('s1', '1234567');

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


  module.exports = {  getNoteAndModulesOfSemestre, getEtudiant ,getSemestre } ; 
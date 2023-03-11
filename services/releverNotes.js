const pool = require('../database')

async  function getNoteAndModulesOfSemestre(semestre, code_apoge){
  const code = code_apoge  ; 
  const sm = semestre ;
  return new Promise((resolve, reject) => {
    pool.query(`SELECT note, nom_md from note_module where code_apoge='${code}' and nom_md in (select nom_md from module where nom_sm= '${sm}')`, (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(result);
      }
     });
    });
}

getNoteAndModulesOfSemestre('s1', '1234567') ; 


  module.exports = { getNoteAndModulesOfSemestre } ; 
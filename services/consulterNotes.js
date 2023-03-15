const pool = require('../database');

async  function getNoteBySemestre(semestre, code_apoge){
  const code = code_apoge  ; 
  const sm = semestre ;
  return new Promise((resolve, reject) => {
    pool.query(`SELECT note FROM note_semestre where code_apoge=${code} and nom_sm='${sm}'`, (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        const rowDataPacket = result[0];
        const note = rowDataPacket?.note;
        resolve(note);
      }
     });
    });
  }

  async  function getNoteByModule(module, code_apoge){
    const code = code_apoge  ; const md = module ;
    return new Promise((resolve, reject) => {
      pool.query(`SELECT note FROM note_module where code_apoge=${code} and nom_md='${md}'`, (error, result) => {
        if (error) {
          reject(error);
        }
        else {
          const rowDataPacket = result[0];
          const note = rowDataPacket?.note;
          resolve(note);
        }
       });
      });
    }


  async  function getAllSemestre(code_apoge){
    const code = code_apoge  ;
    return new Promise((resolve, reject) => {
      pool.query(`SELECT nom_sm FROM note_semestre where code_apoge=${code}`, (error, result) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(result);
        }
       });
      });
    }

    async  function getAllModules(code_apoge){
      const code = code_apoge  ;
      return new Promise((resolve, reject) => {
        pool.query(`SELECT nom_md FROM note_module where code_apoge=${code}`, (error, result) => {
          if (error) {
            reject(error);
          }
          else {
            resolve(result);
          }
         });
        });
      }
  

module.exports = {  getNoteByModule,getAllSemestre, getNoteBySemestre ,getAllModules} ; 


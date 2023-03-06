const pool = require('../database');

async  function getNoteBySemestre(semestre, code_apoge){
  const code = code_apoge  ; const sm = semestre ;
  return new Promise((resolve, reject) => {
    pool.query(`SELECT note FROM note_semestre where code_apoge=${code} and nom_sm='${sm}'`, (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        const rowDataPacket = result[0];
        const valeurNote = rowDataPacket?.note;
        console.log(valeurNote) ; 
        resolve(valeurNote);
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
          console.log(result) ; 
          resolve(result);
        }
       });
      });
    }



  async function getNoteByModule(module, code_apoge){
    const query = `SELECT note FROM note_semestre where  id_module= ${module} and code_apoge = ${code_apoge} ` ; 
    pool.query(query , (error , result)=>{
      if(error){ 
        console.log(error) ; 
      }
      tableaux.push(reuslt)
      const  note_module = result ; 
      return note_module  ; 
    })
  }
  



module.exports = {  getNoteByModule,getAllSemestre, getNoteBySemestre} ; 


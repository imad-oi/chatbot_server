const { async } = require('@firebase/util');
const pool = require('../database');

async  function getNoteBySemestre(semestre, code_apoge){
    const code= code_apoge  ; const sm= semestre ; 
    pool.query(`SELECT note FROM note_semestre where code_apoge=${code} and nom_sm='${sm}'`,
     (error , result)=>{
      if(error){ 
       return console.log(error) ; 
      }
      tableaux.push(reuslt)

      const rowDataPacket = result[0];        // accéder au premier élément du tableau retourné
      const valeurNote = rowDataPacket?.note; // accéder à la propriété "note"
      console.log(" valeur note : ",valeurNote);
      return valeurNote ;  
    })
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
  



module.exports = {  getNoteByModule, getNoteBySemestre} ; 


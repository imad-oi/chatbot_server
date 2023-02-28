const pool = require('../database');

// // function to execute the query with dynamic parameters
// async function getRowsByEntity(tableName, predicat) {
//     const query = `SELECT * FROM ${tableName} WHERE ${predicat} = ?`;
//     const [rows, fields] = await pool.query(query, [predicat]);
    
//     return rows;
//   }

// // example usage
// const entityName = 'pepperoni'; // assume this is the entity's name returned from Dialogflow
// const tableName = 'pizza'; // assume this is the table name corresponding to the entity
// getRowsByEntity(tableName, entityName)
//   .then((rows) => {
//     console.log(rows);
//     // do something with the query results
//   })
//   .catch((error) => {
//     console.error(error);
//     // handle the error
//   });


  async function getNoteBySemestre(semestre, code_apoge){
    const code= code_apoge  ; 
    const sm= semestre ; 
    const query = `SELECT note FROM note_semestre where code_apoge=${code} and nom_sm='${sm}' ` ; 
    pool.query(query ,[code , sm], (error , result)=>{
      if(error){ 
        console.log(error) ; 
      }
      console.log( "note from getnote by semestre in service : ",result, typeof result); 
      return result ; 
    })
  }


  async function getNoteByModule(module, code_apoge){
    const query = `SELECT note FROM note_semestre where  id_module= ${module} and code_apoge = ${code_apoge} ` ; 
    pool.query(query , (error , result)=>{
      if(error){ 
        console.log(error) ; 
      }
      const  note_module = result ; 
      return note_module  ; 
    })
  }

  



module.exports = {  getNoteByModule, getNoteBySemestre} ; 


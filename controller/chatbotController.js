// dans ce fichier vous devez appeler tous les services de notre chatbot 

const consulterNote = require('../services/consulterNotes');
const demanderRV = require('../services/demanderRV');
const chercherFormations = require('../services/chercherFormations');
const demanderAttInscription = require('../services/demanderAttInscription');

const detectIntent = require('../services/dialogflow') ; 
const pool = require('../database')


 async function traiterRequette(req, res){
    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;

     console.log(queryText, languageCode, sessionId);
    var responseData = await detectIntent(languageCode, queryText, sessionId);
    const responses = { 
        entities : responseData.entities,
        response : responseData.response
    }
    //  l'idee c'est que à chaque fois que dialogflow nous envoyer quel que chose, faire une analyse de quoi il s'agit, puis faire un action 
    
    // if(responseData.entities == 'notes')
    // {
    //   // pool.query(`SELECT * FROM notes `)
    //   res.send('pouvez nous dire quel semestre et quel module ')
    // }
  
    if(responseData.entities =='pizza'){
      pool.query(`select * from pizza `, (error , result)=>{
        if(error) {
            return console.log(error) ; 
        }
        
  
        let pizzas = result ; 
        let tableHtml = '<table><thead><tr><th>ID</th><th>Name</th></tr></thead><tbody>';
        pizzas.forEach(pizza => {
          tableHtml += `<tr><td>${pizza.id}</td><td>${pizza.taille}</td></tr>`;
        });
  
        tableHtml += '</tbody></table>';
        const responses = { 
          entities : responseData.entities,
          response : responseData.response ,
          html : tableHtml
      }
        res.send(responses)
        return console.log(pizzas)
      })
      
    }else{
      res.send(responses);
    }
  };



// function to execute the query with dynamic parameters
async function getRowsByEntity(tableName, predicat) {
  const query = `SELECT * FROM ${tableName} WHERE ${predicat} = ?`;
  const [rows, fields] = await pool.query(query, [predicat]);
  return rows;
}

    module.exports = {traiterRequette} ; 
  
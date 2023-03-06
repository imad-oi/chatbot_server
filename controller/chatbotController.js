// dans ce fichier vous devez appeler tous les services de notre chatbot 
const consulterNote = require('../services/consulterNotes');
const demanderRV = require('../services/demanderRV');
const chercherFormations = require('../services/chercherFormations');
const demanderAttInscription = require('../services/demanderAttInscription');
const detectIntent = require('../services/dialogflow') ; 
const pool = require('../database');

const previousContexts =[] ; 
async function traiterRequette(req, res){
   console.log("enter de controller  : " , previousContexts) ; 
    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;

    var responseData = await detectIntent(languageCode, queryText, sessionId , previousContexts);
    console.log( "context  : : : :  : ", responseData.context) ; 
    if(responseData.context){
      previousContexts.push(responseData.context);
    }
    console.log(responseData);
    console.table(responseData.entitiesArray);
    // i created an object to store all the data returned from dialogflow
    const responses = { 
        intent : responseData.intent , 
        entities : responseData.entities,
        response : responseData.response,
        entitiesArray : responseData.entitiesArray
    }

     if(responseData.intent == 'login'){

    }
    else if(responseData.intent =='notes')
    {
      console.table(responseData.entitiesArray);
      if(
        responseData.entitiesArray[0].entity ==='semestre' || 
        responseData.entitiesArray[1].entity ==='semestre' )
      {
        const sm =  responseData.entitiesArray[0].value  || responseData.entitiesArray[1].value  ; 
        const code = '11111' ; 
        const query = `SELECT note FROM note_semestre where code_apoge=${code} and nom_sm='${sm}' ` ; 
        pool.query(query ,  async (error , result)=>{
        if(error){ 
        return console.log(error) ; 
        }
        const rowDataPacket = result[0]; // accéder au premier élément du tableau retourné
        const valeurNote = rowDataPacket?.note; // accéder à la propriété "note"
        console.log(" valeur note : ",valeurNote); 

        const codeHtml = `<p>${valeurNote}</p>` ; 
        const responses = { 
          entities : responseData.entities,
          response : responseData.response ,
          html : codeHtml
          }
          res.setHeader('Content-Type', 'text/html');
          res.send(responses)
      })
      }
    }
    else{
      res.send(responses);
    }
  };
  module.exports = {traiterRequette} ; 
  
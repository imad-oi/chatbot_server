// dans ce fichier vous devez appeler tous les services de notre chatbot 

const consulterNote = require('../services/consulterNotes');
const demanderRV = require('../services/demanderRV');
const chercherFormations = require('../services/chercherFormations');
const demanderAttInscription = require('../services/demanderAttInscription');

const detectIntent = require('../services/dialogflow') ; 
const pool = require('../database');


 async function traiterRequette(req, res){
    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;

     console.log(queryText, languageCode, sessionId);
     // send the data comes from the client side to dialogflow 
    var responseData = await detectIntent(languageCode, queryText, sessionId);
    // console.log(responseData);
    console.table(responseData.entitiesArray);

    // i created an object to store all the data returned from dialogflow
    const responses = { 
        intent : responseData.intent , 
        entities : responseData.entities,
        response : responseData.response,
        entitiesArray : responseData.entitiesArray
    }
    //  l'idee c'est que à chaque fois que dialogflow nous envoyer quel que chose, faire une analyse de quoi il s'agit, puis faire un action 
    
    if(responseData.intent =='notes')
    {
      if(
        responseData.entitiesArray[0].entity ==='semestre' || 
        responseData.entitiesArray[1].entity ==='semestre' )
      {
        // console.log(responseData.entitiesArray[0].entity, "value:", responseData.entitiesArray[0].value) ; 
        const sm =  responseData.entitiesArray[0].value  || responseData.entitiesArray[1].value  ; 

          consulterNote.getNoteBySemestre(sm,'11111').then(
            (res)=>{
              console.log(res) ;
              const codeHtml = `<p> ${res} </p>` ; 
              const responses = { 
                entities : responseData.entities,
                response : responseData.response ,
                html : codeHtml
            }
          }
          ).catch((error)=>console.error(error))
        } // fin du if statement
        res.setHeader('Content-Type', 'text/html');
        res.send(responses)
          
    }else{
      res.send(responses);
    }
  };


    module.exports = {traiterRequette} ; 
  
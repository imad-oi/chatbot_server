// dans ce fichier vous devez appeler tous les services de notre chatbot 
const consulterNote = require('../services/consulterNotes');
const demanderRV = require('../services/demanderRV');
const chercherFormations = require('../services/chercherFormations');
const demanderAttInscription = require('../services/demanderAttInscription');
const auth = require('../services/auth');
const detectIntent = require('../services/dialogflow') ; 
const pool = require('../database');

async function traiterRequette(req, res){
    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;

    let responses = { 
      intent : '' , 
      entities : '', 
      response : '',
      entitiesArray : '', 
      nom : ''
        }

     //   var responseData = await detectIntent(languageCode, queryText, sessionId );
        var responseData = await detectIntent(languageCode, queryText, sessionId );
        
    console.log(responseData);
    console.log('ici responseData');
    console.table(responseData.entitiesArray);
    console.log('ici responseData.entitiesArray');
    // i created an object to store all the data returned from dialogflow , and it will be sent to front-end if no service is called
     responses = { 
        intent : responseData.intent , 
        entities : responseData.entities,
        response : responseData.response,
        entitiesArray : responseData.entitiesArray
          }

    // ###########################################" login " ########################################""
     if(responseData.intent === 'login'){
      console.table( 'logggggggggggggiiiiiiiiiiiiiiiiiiiiiiiiiin' , responseData.entities)
       code_apoge = responseData.entitiesArray[0].value ;
       process.env.CODE_APOGE = code_apoge ;
          if(code_apoge !== undefined){
              auth.authentifier(code_apoge)
              .then(data => {
                 // if user's code apoge exist in db
                    if(data.nomEtudiant != undefined && data.prenomEtudiant != undefined){
                      const nom = data.nomEtudiant + ' ' +data.prenomEtudiant   ; 

                      const html = `<p>  ${data.prenomEtudiant} ${data.nomEtudiant} , comment je veux vous aidez ? </p>`;
                       responses = { 
                        entities : responseData.entities,
                        response : responseData.response ,
                        html : html , 
                        nom : nom 
                      }

                      res.setHeader('Content-Type', 'text/html');
                      res.send(responses)
                    }
                    else{
                        responses={
                          response : ' votre code apoge n\'est pas correct '
                      }
                      // return de la fonction 
                      res.send(responses)
                    }
              })
              .catch(error => {
                console.error('erroooooooooooooooooooooooooooor',error);
              });
                }else{
                    responses = { 
                      entities : responseData.entities,
                      response : 'il est possible que votre code apoge n\'est pas correct !!' ,
                    }
                  res.send(responses)
            }
      }
       // ###########################################" semestre  " ########################################""
      else if(responseData.intent === 'recuperer_semestre'){
        const code = process.env.CODE_APOGE ; 
          if(code == undefined )
          {
            responses = {response : ' vous n\'avez pas encore entrer votre code apoge , veuillez le faire !'  }
            console.log("::::::::::::::::::::::: non connecter :::::::::::::::::::::::::::::::::::")
            res.send(responses) ; 
            return -1 ;
           }
          else{
            const semestre = responseData.entitiesArray[0].value ; 
            // console.log("code apoge from controller :" , code) ; 
            consulterNote.getNoteBySemestre(semestre , code)
            .then((data)=>{
              console.log( 'data  recuper from  semestre  : : ', data);
              if(data !== undefined){
              const html = `<p><span style="font-weight: bolder;font-size: 24px;border:4px solid black ; padding  : 0 15px ; border-radius:15px  ;margin: 4px 0 4px 20px ">${data}</span>  </br> N'hésitez pas à me poser d\'autres questions si vous en avez besoin ? </p>`
              responses = { 
               entities : responseData.entities,
               response : responseData.response ,
               html : html
             }
             res.setHeader('Content-Type', 'text/html');
             res.send(responses)
               }
               else{
                console.log("############################################# le cas ou data est undefined en semestre" )
                consulterNote.getAllSemestre(code)
                .then((data)=>{
                  console.log('data of all sm : ',  data) ; 
                  let html = `<p>le semestre que vous avez entré n\'est pas valid  , voici les semestre disponibles : </p>`;
                  data.forEach(sm => {
                    html += `<p><span style="border:4px solid black ;  border-radius:15px  ; ">${sm.nom_sm}</span> </p>`;
                  });
                  responses = { 
                    html : html
                  }
                  res.setHeader('Content-Type', 'text/html');
                  res.send(responses)
                })
               }
            })
            .catch((error)=>{
              console.log(error); 
            })
          }
      }
       // ###########################################" module " ########################################""
       else if(responseData.intent === 'recuperer_module'){
        const code = process.env.CODE_APOGE ; 
          if(code == undefined )
          {
            responses = {response : ' vous n\'avez pas encore entrer votre code apoge , veuillez le faire !'  }
            console.log("::::::::::::::::::::::: non connecter :::::::::::::::::::::::::::::::::::")
            res.send(responses) ; 
            return -1 ; 
           }
          else{
            const module = responseData.entitiesArray[0].value ; 
            // console.log("code apoge from controller :" , code) ; 
            consulterNote.getNoteByModule(module , code)
            .then((data)=>{
              console.log( 'data  recuper from  module   : : ', data);
              if(data !== undefined){
              const html = `<p><span style="font-weight: bolder;font-size: 24px;border:4px solid black ; padding  : 0 15px ; border-radius:15px  ;margin: 4px 0 4px 20px ">${data}</span> <a href="http://www.fstg-marrakech.ac.ma/FST/fichiers/LST-SIR.pdf" >click</a>  </br> N'hésitez pas à me poser d\'autres questions si vous en avez besoin ? </p>`
              responses = { 
               entities : responseData.entities,
               response : responseData.response ,
               html : html
             }
             res.setHeader('Content-Type', 'text/html');
             res.send(responses)
               }
               else{
                console.log("############################################# le cas ou data est undefined en module" )
                consulterNote.getAllModules(code)
                .then((data)=>{
                  console.log('data of all modules : ',  data) ; 
                  let html = `<p>le module que vous avez entré n\'est pas valid  , voici les semestre disponibles : </p>`;
                  data.forEach(module => {
                    html += `<p><span style="border:4px solid black ;  border-radius:15px  ; max-width:50px ">${module.nom_md}</span> </p>`;
                  });
                  responses = { 
                    html : html
                  }
                  res.setHeader('Content-Type', 'text/html');
                  res.send(responses)
                })
               }
            })
            .catch((error)=>{
              console.log(error); 
            })
          }


//########################  cycle disponaible    ##################################
      }
      else  if(responseData.intent === 'Consulterformation'){
        const code = process.env.CODE_APOGE ; 
        if(code === undefined){
          responses = {response : ' vous n\'avez pas encore entrer votre code apoge , veuillez le faire !'  }
          console.log("::::::::::::::::::::::: non connecter :::::::::::::::::::::::::::::::::::")
          res.send(responses) ; 
          return -1 ;
        }else{
          chercherFormations.cycleDispo()
          .then((data)=>{
            console.log("189",data, typeof data);
              let html=`<p>voici les differents cycles : </p>`
              data.forEach(cycle =>{
                console.log('here is test');
                console.log(cycle.cycle);
                html +=`<p><span style="border:4px solid black ;  border-radius:15px  ; max-width:50px ">${cycle.cycle}</span> </p>`;
              });
              responses ={
                html : html
              }
              res.setHeader('Content-Type', 'text/html');
              res.send(responses)
          })
            .catch((error)=>{
              console.log(error); 
        })
        }
      }
      // #######################################################" type formation #####################################"""
      else if(responseData.intent === 'type_de_formation'){

        const code = process.env.CODE_APOGE ; 
        const cycle = responseData.entitiesArray[0].value ;
        console.log('heeeeeeeeeeeeeeeeeeeeeeeererere',cycle)
        if(code === undefined){
          responses = {response : ' vous n\'avez pas encore entrer votre code apoge , veuillez le faire !'  }
          console.log("::::::::::::::::::::::: non connecter :::::::::::::::::::::::::::::::::::")
          res.send(responses) ; 
          return -1 ;
        }else{
          chercherFormations.formationDispo(cycle)
          .then((data)=>{
            console.log('221',data); //
            console.log('data of all modules : ',  data) ; 
                  let html = `<p>voici les formation correspondants disponibles : </p>`;
                  data.forEach(cycle => {
                    // html += `<p><span style="border:4px solid black ;  border-radius:15px  ; max-width:50px ">${cycle}</span> </p>`;
                    html+=`<a  href="${cycle.lien}" >${cycle.nom}</a>` ; 
                  });
                  responses = { 
                    html : html
                  }
                  res.setHeader('Content-Type', 'text/html');
                  res.send(responses)
                })
        }
      }
      else{
                   // if nooo service is called 
                    res.setHeader('Content-Type', 'text/html');
                    res.send(responses);
                    
                    console.log('ici responses');
      }

    };  //fin traiter requete

  module.exports = {traiterRequette} ; 
  
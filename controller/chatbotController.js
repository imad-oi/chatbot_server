// dans ce fichier vous devez appeler tous les services de notre chatbot 
const consulterNote = require('../services/consulterNotes');
const demanderRV = require('../services/demanderRV');
const chercherFormations = require('../services/chercherFormations');
const releverNote = require('../services/releverNotes'); 
const auth = require('../services/auth');
const detectIntent = require('../services/dialogflow') ; 
const sharedData = require('../services/sharedData') ; 
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
      nom : '', 
        }

        var responseData = await detectIntent(languageCode, queryText, sessionId );
        
    // i created an object to store all the data returned from dialogflow , and it will be sent to front-end if no service is called
     responses = { 
        intent : responseData.intent , 
        entities : responseData.entities,
        response : responseData.response,
        entitiesArray : responseData.entitiesArray
          }

    // ###########################################" login " ########################################""
     if(responseData.intent === 'login'){
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
                      res.send(responses)
                    }
              })
              .catch(error => {
                console.error(error);
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
            res.send(responses) ; 
            return -1 ;
           }
          else{
            const semestre = responseData.entitiesArray[0].value ; 
            consulterNote.getNoteBySemestre(semestre , code)
            .then((data)=>{
              if(data !== undefined){
              const html = `<p><span class="rounded bg-light w-29 text-dark p-1 m-5 ">${data}</span>  </br> N'hésitez pas à me poser d\'autres questions si vous en avez besoin ? </p>`
              responses = { 
               entities : responseData.entities,
               response : responseData.response ,
               html : html
             }
             res.setHeader('Content-Type', 'text/html');
             res.send(responses)
               }
               else{
                consulterNote.getAllSemestre(code)
                .then((data)=>{
                  let html = `<p>le semestre que vous avez entré n\'est pas valid  , voici les semestre disponibles : </p>`;
                  data.forEach(sm => {
                    html += `<p><span class="rounded bg-light w-29 text-dark px-5 m-5 ">${sm.nom_sm}</span></p> `;
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
        console.log('120',code);
          if(code == undefined )
          {
            responses = {response : ' vous n\'avez pas encore entrer votre code apoge , veuillez le faire !'  }
            res.send(responses) ; 
            return -1 ; 
           }
          else{
            const module = responseData.entitiesArray[0].value ; 
            consulterNote.getNoteByModule(module , code)
            .then((data)=>{
              if(data !== undefined){
              const html = `<p><span class="rounded p-1 m-5 text-dark bg-light">${data}</span> </br> N'hésitez pas à me poser d\'autres questions si vous en avez besoin ? </p>`
              responses = { 
               entities : responseData.entities,
               response : responseData.response ,
               html : html
             }
             res.setHeader('Content-Type', 'text/html');
             res.send(responses)
               }
               else{
                consulterNote.getAllModules(code)
                .then((data)=>{
                  let html = `<p>le module que vous avez entré n\'est pas valid  , voici les modules disponibles : </p>`;
                  data.forEach(module => {
                    html += `<p class="row mx-2"><span class= "rounded bg-light w-29 text-dark px-1 " >${module.nom_md}</span> </p>`;
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
          res.send(responses) ; 
          return -1 ;
        }else{
          chercherFormations.cycleDispo()
          .then((data)=>{
              let html=`<p >voici les differents cycles : </p>`
              data.forEach(cycle =>{
                html +=`<p><span class="nav-link  text-center rounded border bg-light text-dark m-2 p-1" >${cycle.cycle}</span> </p>`;
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
        const code = process.env.CODE_APOGE ; const cycle = responseData.entitiesArray[0].value ;
        if(code === undefined){
          responses = {response : ' vous n\'avez pas encore entrer votre code apoge , veuillez le faire !'  }
          res.send(responses) ; 
          return -1 ;
        }else{
          chercherFormations.formationDispo(cycle)
          .then((data)=>{
                  let html = `<p>voici les formation correspondants disponibles : </p>`;
                  data.forEach(cycle => {
                    html += `<a target="_blank" class="nav-link text-center rounded border bg-light text-dark m-2 p-1"  aria-disabled="false"  href="${cycle.lien}">
                    ${cycle.nom}
                    </a>`;
                  });
                  responses = { 
                    html : html
                  }
                  res.setHeader('Content-Type', 'text/html');
                  res.send(responses)
                })
        }
      }else if(responseData.intent === 'typeDiplomeRv') {
        const code = process.env.CODE_APOGE ;  const sujet = responseData.entitiesArray[0].value ;
        if(code == undefined )
        {
          responses = {response : ' vous n\'avez pas encore entrer votre code apoge , veuillez le faire !'  }
          res.send(responses) ; 
          return -1 ;
         }else{
          demanderRV.sauvgarderRendezVous(code,sujet);
          let NomPrenom = await auth.authentifier(code) ;
          demanderRV.afficherRendezVous(code)
          .then((data)=>{
            
            const options = { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              // hour: 'numeric', 
              // minute: 'numeric', 
              // second: 'numeric',
              // hour12: false
            };
            let date =  data.dateRv.toLocaleDateString('fr-FR', options) ; 
            let html = `<p>votre Rendez Vous est enregistrer.</p><br>
            <p>nom et prenom : ${NomPrenom.nomEtudiant} ${NomPrenom.prenomEtudiant} </p> <br>
            <p>sujet : retirer de ${data.sujetRv}</p> <br>
            <p>date  : ${date}</p> <br>`;
            responses = { 
              html : html
            }
            res.setHeader('Content-Type', 'text/html');
            res.send(responses)
          })
         }
      }
      // ##################################"" releve de notes ##############################
      else if(responseData.intent === 'ConsulterReleveDeNote') {
        console.table(responseData.entitiesArray) ; 
        const code = process.env.CODE_APOGE ;
        const semestre = responseData.entitiesArray[0].value ;
        if(code == undefined )
        {
          responses = {response : ' vous n\'avez pas encore entrer votre code apoge , veuillez le faire !'  }
          res.send(responses) ; 
          return -1 ;
         }else{
        // console.log('239', code , semestre ) ; 
        
        releverNote.getNoteAndModulesOfSemestre(code, semestre)
         .then((data)=>{
          if(data !== undefined){ 
            console.log(data)
            sharedData.setSharedData(data) ;
            sharedData.setSemstre(semestre);
            // here i pass the data to router.js to use it to generate pdf
            const html = `<p> <a href="http://localhost:5000/download-pdf  " target="_blanck" class="btn btn-light mr-3 " > Download Relve de note</a> </p>`
           responses = { 
           response : responseData.response ,
           html : html, 
         }

         res.setHeader('Content-Type', 'text/html');
         res.send(responses)
        }})
       releverNote.insertIntoReleve(code, semestre );
      }
      }
      else{
                   // if nooo service is called 
                    res.setHeader('Content-Type', 'text/html');
                    res.send(responses);
                    
                    console.log('ici responses');
      }
    }; 

  module.exports = {traiterRequette} ; 
  
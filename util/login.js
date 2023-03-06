
const code_apoge = responseData.entitiesArray[0].value ;
      if(code_apoge !== undefined){
          auth.authentifier(code_apoge)
          .then(data => {
            if(data.nomEtudiant != undefined && data.prenomEtudiant != undefined){
              const html = `<p>  ${data.prenomEtudiant} ${data.nomEtudiant} ,  comment je veux vous aidez ? </p>`
              const responses = { 
                entities : responseData.entities,
                response : responseData.response ,
                html : html
              }
              res.setHeader('Content-Type', 'text/html');
              res.send(responses)
            }
            else{
              const responses={
                response : ' votre code apoge n\'est pas correct '
              }
              res.send(responses)
            }
          })
          .catch(error => {
            console.error('erroooooooooooooooooooooooooooor',error);
          });
        }else{
          const responses = { 
            entities : responseData.entities,
            response : 'il est possible que votre code apoge n\'est pas correct !!' ,
            }
          res.send(responses)
        }
      

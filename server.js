const express = require('express'); 
const cors = require('cors')
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow') ; 

const app = express() ; 
app.use(cors());
app.use(bodyParser.json());

// credentials
const CREDENTIALS = {
    "type": "service_account",
    "project_id": "chatbot-auds",
    "private_key_id": "cfc8b81e2e81e12dbe22b6b8ae765c0003f95e57",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKV3ELAP+yCU/b\nfAxHS62XfOgXoxIpEFFp8t8WZkBu1BjyOV8UVqTYaNUZoly2/MANIQR/3FKWaI4R\nmF/13WiSL5NKkXct+GfUgI0Y9voy0KgiicYwutRa/spSvAiQmjTshlcUmozP4Z/C\nQ6Z7dqhasQCtsF5r1ebQ3pwFuBs1kW4WsgvrLuMUotPAi5H+oal2eMkjdYZhZIvm\n4vweBkj9qm5nNsHH/w2ZtXZ0ovX1484/J6hncYDiNGewX3sEIQ8wSa5j057ENNBU\nDwS1fBIQGUxV6FEA4a1ooGQljUG2cU3vsKOe8BcyWqV5lMLW/c5YCW+UavrSOaYe\nDuJnYr35AgMBAAECggEAWpya6m8Zknx6DxO3mevpgpf0hbVIqiv9EYGqZqkGvLrt\nqveHPR/p9WHI4JBljaqVRKvfDHU5ZNLQoE+I1Z0/uYtlnfSTlvoRYUfqJ95eQAhR\n6xmgr+zSsSc9qpw7B6qO/cbRU1A8s9FZzlCmSs7h6K8wWxfKyObC1RGDdEo0oSFB\nP/bMrsFZ8PolzQ/c1Z+H6oqsRircSCTmWCSS6yWn/p/D3O3QYMz/E9BiiKheNxj4\nH+pGGpKfhguHoLkOR70VSVKrf3M4As2YeTwkFc1M2AmvfSYkqxSriCSPoD0CotSt\nY1F4QnzLO770mOQW9zfpuwu+MNBUW+NcUw4ZYUmFSwKBgQD3+TapNvJZvoaXdFY7\nJ1a/8abgvnRBp1au8+h2dCCGMSecbBPydJHf9JMktp4AOpfc1MxDPpjb2WyP4Mu1\nhUeutrjUqbrUyP4qsCYr2sd2nVpdCfmuigNK/pv8Tk1e1QPzBbE/EuW3Ry9D0v0F\noq12Larc6G4atm8ye7XgWHNCPwKBgQDQ5BuJ34XbuW+EnuK49GosmcD5Yi6VaqmP\nZQnE26+2pUczRMWhcXJr92uqfdwlrlMFBVgMwFda46xtBS1QWcCd+J4bNkfp/321\nftCkmv/y5TSnDl6/+LMfdtWhv6YgeS/62I/jlfHbgJxMieSpeaJ7lI1FxX4zs4V4\nYU1+m3gBxwKBgQDxI91e8nr8gMW7tLtCbP/0SlfAyBSf383w9mnB/y29sUFW4NcI\n+Qj+Y4VPt3KwwEn7ysgUQGQ/rxDeXXlbvQ83PKNC0wdHc2mPM5r7HJbJpz0/qrqu\nW7HWFQC1e6PLq5RamNeDgan37/Zrm1rIRykt+jzk8/ZWbcB2tEzqrLjw2wKBgDFE\na55UAr00+jFcS/r1YolMZjArUPNaqc0xNmGgssuwJZ/Y64fNOwBt5Y3bi22ztM7t\nWLwBLVk5c3RvESXvVTes6JVgcwukf6Cr3UfFavJ9zrJL+FrsrEqSe4Zfri3gh0lx\nhFZYCigMKFEBANZb4s+k1MEM+Fv3TlZ7FIz03BQHAoGAO0XJ3bM5sI65/h2fdOAp\nloUZPdFOcgX/A2ykCS+U/8JPvZQDy+g1VHhWvw+2rSxyOu+nhPZyQElB11XW7T8R\nMe0QeWgNZhgX7VbTBAjEMb2Ym+69SW31DSa6YElE7p+tsNTToTiWDgHXaNYQONRt\ntm5iFWAF9A1/HYSdbc3IucE=\n-----END PRIVATE KEY-----\n",
    "client_email": "chatbot-bot@chatbot-auds.iam.gserviceaccount.com",
    "client_id": "116166319528895296705",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/chatbot-bot%40chatbot-auds.iam.gserviceaccount.com"
  }
  
  const projectId  = CREDENTIALS.project_id ; 

  // configuration for the client 
const configuration  = {
    credentials : {
      private_key: CREDENTIALS['private_key'], 
      client_email:CREDENTIALS['client_email']
    }
  }

  // create a new session 
const sessionClient = new dialogflow.SessionsClient(configuration) ; 


const detectIntent = async (languageCode , queryText  , sessionId )=>{
    let sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  
    // the text query request 
    let request = { 
      session: sessionPath , 
      queryInput :{
        text:{
          // the query to send to the dialogflow agent 
          text:queryText  , 
          // the language used by the client (en-US)
          languageCode : languageCode 
        }
      }
    };
  
    // send request and log result 
    const responses = await sessionClient.detectIntent(request) ;
    const result = responses[0].queryResult;
    console.log(result.fulfillmentText ) ;  
  
    return{
      response: result.fulfillmentText 
    }
  } 


app.post('/api/chatbot', async (req, res) => {

  let languageCode = req.body.languageCode;
  let queryText = req.body.queryText;
  let sessionId = req.body.sessionId;
// const dataFromUser = req.body.dataToSend
   console.log(queryText, languageCode, sessionId);
  const responseData = await detectIntent(languageCode, queryText, sessionId);
  res.send(responseData.response);

    // res.send('Data received!');
  });

app.get("/" , (req , res)=>{
    res.status(200).send({
        message:"hello from server"
    }) ; 
})

app.get("/api" , (req , res)=>{
    res.json({"users":["imad" , "ohssine" , "lhabib"]}) ; 
})

app.listen(5000 , ()=>{ console.log('server started on port http://localhost:5000')});
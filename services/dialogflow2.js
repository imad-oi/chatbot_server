




const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

// Replace with your own project ID and credentials file path


const credentialsFilePath = {"type": "service_account",
"project_id": "chatbot-auds",
"private_key_id": "cfc8b81e2e81e12dbe22b6b8ae765c0003f95e57",
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKV3ELAP+yCU/b\nfAxHS62XfOgXoxIpEFFp8t8WZkBu1BjyOV8UVqTYaNUZoly2/MANIQR/3FKWaI4R\nmF/13WiSL5NKkXct+GfUgI0Y9voy0KgiicYwutRa/spSvAiQmjTshlcUmozP4Z/C\nQ6Z7dqhasQCtsF5r1ebQ3pwFuBs1kW4WsgvrLuMUotPAi5H+oal2eMkjdYZhZIvm\n4vweBkj9qm5nNsHH/w2ZtXZ0ovX1484/J6hncYDiNGewX3sEIQ8wSa5j057ENNBU\nDwS1fBIQGUxV6FEA4a1ooGQljUG2cU3vsKOe8BcyWqV5lMLW/c5YCW+UavrSOaYe\nDuJnYr35AgMBAAECggEAWpya6m8Zknx6DxO3mevpgpf0hbVIqiv9EYGqZqkGvLrt\nqveHPR/p9WHI4JBljaqVRKvfDHU5ZNLQoE+I1Z0/uYtlnfSTlvoRYUfqJ95eQAhR\n6xmgr+zSsSc9qpw7B6qO/cbRU1A8s9FZzlCmSs7h6K8wWxfKyObC1RGDdEo0oSFB\nP/bMrsFZ8PolzQ/c1Z+H6oqsRircSCTmWCSS6yWn/p/D3O3QYMz/E9BiiKheNxj4\nH+pGGpKfhguHoLkOR70VSVKrf3M4As2YeTwkFc1M2AmvfSYkqxSriCSPoD0CotSt\nY1F4QnzLO770mOQW9zfpuwu+MNBUW+NcUw4ZYUmFSwKBgQD3+TapNvJZvoaXdFY7\nJ1a/8abgvnRBp1au8+h2dCCGMSecbBPydJHf9JMktp4AOpfc1MxDPpjb2WyP4Mu1\nhUeutrjUqbrUyP4qsCYr2sd2nVpdCfmuigNK/pv8Tk1e1QPzBbE/EuW3Ry9D0v0F\noq12Larc6G4atm8ye7XgWHNCPwKBgQDQ5BuJ34XbuW+EnuK49GosmcD5Yi6VaqmP\nZQnE26+2pUczRMWhcXJr92uqfdwlrlMFBVgMwFda46xtBS1QWcCd+J4bNkfp/321\nftCkmv/y5TSnDl6/+LMfdtWhv6YgeS/62I/jlfHbgJxMieSpeaJ7lI1FxX4zs4V4\nYU1+m3gBxwKBgQDxI91e8nr8gMW7tLtCbP/0SlfAyBSf383w9mnB/y29sUFW4NcI\n+Qj+Y4VPt3KwwEn7ysgUQGQ/rxDeXXlbvQ83PKNC0wdHc2mPM5r7HJbJpz0/qrqu\nW7HWFQC1e6PLq5RamNeDgan37/Zrm1rIRykt+jzk8/ZWbcB2tEzqrLjw2wKBgDFE\na55UAr00+jFcS/r1YolMZjArUPNaqc0xNmGgssuwJZ/Y64fNOwBt5Y3bi22ztM7t\nWLwBLVk5c3RvESXvVTes6JVgcwukf6Cr3UfFavJ9zrJL+FrsrEqSe4Zfri3gh0lx\nhFZYCigMKFEBANZb4s+k1MEM+Fv3TlZ7FIz03BQHAoGAO0XJ3bM5sI65/h2fdOAp\nloUZPdFOcgX/A2ykCS+U/8JPvZQDy+g1VHhWvw+2rSxyOu+nhPZyQElB11XW7T8R\nMe0QeWgNZhgX7VbTBAjEMb2Ym+69SW31DSa6YElE7p+tsNTToTiWDgHXaNYQONRt\ntm5iFWAF9A1/HYSdbc3IucE=\n-----END PRIVATE KEY-----\n",
"client_email": "chatbot-bot@chatbot-auds.iam.gserviceaccount.com",
"client_id": "116166319528895296705",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/chatbot-bot%40chatbot-auds.iam.gserviceaccount.com"
};

const projectId = credentialsFilePath.project_id;
console.log(projectId);

const sessionClient = new dialogflow.SessionsClient({
  projectId: projectId,
  keyFilename: credentialsFilePath,
});


async function sendMessageToDialogflow(queryText, sessionId, contextName, contextParams) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  const context = {
    name: sessionClient.projectAgentSessionPath(projectId, sessionId, contextName),
    lifespanCount: 2,
    parameters: contextParams,
  };

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: 'en-US',
      },
    },
    queryParams: {
      contexts: [context],
    },
  };

  const responses = await sessionClient.detectIntent(request);

  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }

  return result;
}

sendMessageToDialogflow('hi' , 'AZ22' , 'consultenotes-followup','module')



module.exports =   sendMessageToDialogflow  ;
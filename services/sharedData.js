let sharedData;
let semestre ; 

function setSharedData(data) {
  sharedData = data;
}

function getSharedData() {
  return sharedData;
}

function setSemstre(data) {
  semestre = data;
}

function getSm() {
  return semestre;
}
module.exports = {setSharedData, getSharedData , getSm , setSemstre };

let sharedData;

function setSharedData(data) {
  sharedData = data;
}

function getSharedData() {
  return sharedData;
}

module.exports = {
  setSharedData,
  getSharedData
};

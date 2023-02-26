const pool = require('../database');

// function to execute the query with dynamic parameters
async function getRowsByEntity(tableName, predicat) {
    const query = `SELECT * FROM ${tableName} WHERE ${predicat} = ?`;
    const [rows, fields] = await pool.query(query, [predicat]);
    return rows;
  }

// example usage
const entityName = 'pepperoni'; // assume this is the entity's name returned from Dialogflow
const tableName = 'pizza'; // assume this is the table name corresponding to the entity
getRowsByEntity(tableName, entityName)
  .then((rows) => {
    console.log(rows);
    // do something with the query results
  })
  .catch((error) => {
    console.error(error);
    // handle the error
  });


module.exports = { getRowsByEntity} ; 
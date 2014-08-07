var neo4j = require('node-neo4j');
module.exports.db = db = new neo4j('http://dgwneo4j.cloudapp.net:7474');
// module.exports.db = new neo4j('http://localhost:7474');
//
// db.cypherQuery('MATCH (m:MENU) RETURN m LIMIT 25', function(err, result){
//   console.log(result);
// })

var neo4j = require('node-neo4j');
module.exports.db = new neo4j('http://localhost:7474');

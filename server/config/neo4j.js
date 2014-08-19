var neo4j = require('node-neo4j');
var request = require('request');

module.exports.db = db = new neo4j('http://neo4john.cloudapp.net:7474');

// module.exports.db = db = new neo4j('http://localhost:7474');
module.exports.spatial = spatial = 'http://neo4john.cloudapp.net:7474/db/data/index/node/geom';
module.exports.spatialURI = spatialURI = 'http://neo4john.cloudapp.net:7474/db/data/node/';
module.exports.serif = require("seraph")('http://neo4john.cloudapp.net:7474');


// // RUN A FEW TIMES TO INDEX ALL ITEMS INTO THE SPATIAL RTREE
// db.cypherQuery("MATCH (n:ITEM) WHERE n.lon IS NOT NULL RETURN n LIMIT 1", function(err, result){
//   if(err){
//     return console.log(err);
//   }
//   for(var i = 0; i < result.data.length; i++){
//     // createSpatialIndex(result.data[i]);
//     // console.log(result.data[i]);
//   }
// });
//
//
// function createSpatialIndex(node){
//   request.post(
//     'http://neo4john.cloudapp.net:7474/db/data/index/node/geom',
//     {json:{'key':'dummy', 'value':'dummy', 'uri':'http://neo4john.cloudapp.net:7474/db/data/node/'+node._id}},
//     function(err, res, body){
//       if(err){
//         console.log("---------------------------err", error);
//           // console.log("response", response)
//         if (!error && response.statusCode == 200) {
//             console.log("BODY",  body);
//         }
//
//       }
//       // console.log(res);
//       console.log('!!!!!!!!!!!!!!!!!!!!!!!!', err);
//       console.log("body", body);
//     }
//   );
// }

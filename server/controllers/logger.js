exports.log = function(req, res){
  var log = JSON.parse(req.body.log)
  console.log(log)
  res.send('')
}
exports.info = function(req, res){
  var log = JSON.parse(req.body.log)
  console.info(log)
  res.send('')
}
exports.warn = function(req, res){
  var log = JSON.parse(req.body.log)
  console.warn(log)
  res.send('')
}
exports.error = function(req, res){
  var log = JSON.parse(req.body.log)
  console.error(log)
  res.send('')
}
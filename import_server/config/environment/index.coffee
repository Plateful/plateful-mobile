'use strict'

path = require('path')
_ = require('lodash')

requiredProcessEnv = (name)->
  unless process.env[name]
    throw new Error('You must set the ' + name + ' environment variable')

  process.env[name]


 # All configurations will extend these options
 # ============================================
all =
  env: process.env.NODE_ENV,

  #  Root path of server
  root: path.normalize(__dirname + '/../../..'),

  #  Server port
  port: process.env.PORT || 7777,



 # Export the config object based on the NODE_ENV
 # ==============================================
module.exports = all

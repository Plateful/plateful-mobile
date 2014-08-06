'use strict'

var Parse = require('node-parse-api').Parse;

var APP_ID = 'D0lspYUwswfHqznYEy8ndLvVMsciMd7o3KbyPoyJ';
var MASTER_KEY = 'bSqG0qGVrTD5T03G8KuaM6TbdJlBIK3nWVZMvoHi';

module.exports = new Parse(APP_ID, MASTER_KEY);

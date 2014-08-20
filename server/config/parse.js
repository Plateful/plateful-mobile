'use strict'

// var Parse = require('node-parse-api').Parse;
var Parse = require('parse').Parse;

var APP_ID = 'D0lspYUwswfHqznYEy8ndLvVMsciMd7o3KbyPoyJ';
var MASTER_KEY = 'bSqG0qGVrTD5T03G8KuaM6TbdJlBIK3nWVZMvoHi';
var JAVASCRIPT_KEY = 'iLYeezE6xpphWW3LjoHsXuv3ZOToXHQtvCJzMkRm';

Parse.initialize(APP_ID, JAVASCRIPT_KEY, MASTER_KEY);

module.exports = Parse;

#! /usr/bin/env node

'use strict';

var _libGitClientJs = require('./lib/GitClient.js');

var client = new _libGitClientJs.GitClient();
console.log(client);
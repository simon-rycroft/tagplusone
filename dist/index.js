#! /usr/bin/env node

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libGitClientJs = require('./lib/GitClient.js');

var _libGitClientJs2 = _interopRequireDefault(_libGitClientJs);

var git = new _libGitClientJs2['default']();

git.sayHello();
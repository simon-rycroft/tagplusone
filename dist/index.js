#! /usr/bin/env node

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libGitClient = require('./lib/GitClient');

var _libGitClient2 = _interopRequireDefault(_libGitClient);

var git = new _libGitClient2['default']();

git.sayHello();
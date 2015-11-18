#! /usr/bin/env node

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libModulesGitClient = require('./lib/modules/GitClient');

var _libModulesGitClient2 = _interopRequireDefault(_libModulesGitClient);

var git = new _libModulesGitClient2['default']();

git.tag(function (err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Data: ' + data);
});
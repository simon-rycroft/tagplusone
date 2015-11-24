#! /usr/bin/env node

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libModulesGitClient = require('./lib/modules/git-client');

var _libModulesGitClient2 = _interopRequireDefault(_libModulesGitClient);

var _libModulesGitParser = require('./lib/modules/git-parser');

var _libModulesGitParser2 = _interopRequireDefault(_libModulesGitParser);

var git = new _libModulesGitClient2['default']();
var parser = new _libModulesGitParser2['default']();
var prefix = process.argv[2];

git.tag(prefix, function (err, tags) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    parser.getNextTag(tags, prefix, function (err, nextTag) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(nextTag);
    });
});
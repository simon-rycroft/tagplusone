/**
 * @file A simple wrapper around "git tag"
 * @author Simon Rycroft simon.rycroft@subcode.io
 * @copyright Subcode Ltd 2015
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _child_process = require('child_process');

var GitClient = (function () {
    function GitClient() {
        _classCallCheck(this, GitClient);
    }

    _createClass(GitClient, [{
        key: 'tag',

        /**
         * @callback tagCallback
         * @param {string} err
         * @param {string} data The tags returned from the git command.
         */

        /**
         * Calls "git tag" and captures the raw output.
         *
         * @param {string} prefix If set calls "git tag -l [prefix]*" to fetch only matching tags.
         * @param {tagCallback} callback Called when the full response has been received from git.
         */
        value: function tag(prefix, callback) {
            if (prefix === undefined) prefix = null;

            if (prefix && typeof prefix !== 'string') {
                return callback('prefix must be a string');
            }

            var args = !prefix ? ['tag'] : ['tag', '-l', prefix + '*'],
                tag = (0, _child_process.spawn)('git', args),
                output = '',
                err = '';

            tag.stdout.on('data', function (data) {
                output += data.toString();
            });

            tag.stderr.on('data', function (data) {
                err += data.toString();
            });

            tag.on('close', function (code) {
                if (code !== 0) {
                    err += "git tag exited with error code " + code;
                }
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, output);
                }
            });
        }
    }]);

    return GitClient;
})();

exports['default'] = GitClient;
module.exports = exports['default'];
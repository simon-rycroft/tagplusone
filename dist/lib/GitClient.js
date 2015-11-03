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
        value: function tag(done) {

            console.log('arse');

            var tag = (0, _child_process.spawn)('git', ['tag']),
                output = undefined,
                err = undefined;

            tag.stdout.on('data', function (data) {
                console.log('Calling...');
                output += data.toString();
            });

            tag.stderr.on('data', function (data) {
                console.log('Receiving data...');
                err += data.toString();
            });

            tag.on('close', function (code) {
                console.log('Closing...');
                if (code !== 0) {
                    err += "git tag exited with error code " + code;
                }
                done(err, output);
            });
        }
    }]);

    return GitClient;
})();

exports['default'] = GitClient;
module.exports = exports['default'];
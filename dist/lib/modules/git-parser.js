'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GitParser = (function () {
    function GitParser() {
        _classCallCheck(this, GitParser);
    }

    _createClass(GitParser, [{
        key: 'parseTags',
        value: function parseTags(tags, callback) {
            if (typeof tags !== "string") {
                return callback('tags must be a string');
            }
            return callback(null, tags.split('\n'));
        }
    }, {
        key: 'filterTags',
        value: function filterTags(tags, prefix, callback) {
            if (tags.constructor !== Array) {
                return callback('tags must be an array');
            }
            if (typeof prefix !== "string") {
                return callback('prefix must be a string');
            }
        }
    }]);

    return GitParser;
})();

exports['default'] = GitParser;
module.exports = exports['default'];
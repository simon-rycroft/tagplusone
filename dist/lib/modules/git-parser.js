'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

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
            var validTagPattern = "^" + prefix + "[1-9]{1}[0-9]*$",
                regex = new RegExp(validTagPattern),
                filteredTags = tags.filter(function (tag) {
                return tag.match(regex);
            });
            callback(null, filteredTags);
        }
    }, {
        key: 'stripPrefix',
        value: function stripPrefix(tags, prefix, callback) {
            if (tags.constructor !== Array) {
                return callback('tags must be an array');
            }
            if (typeof prefix !== "string") {
                return callback('prefix must be a string');
            }
            var data = _lodash2['default'].map(tags, function (tag) {
                return tag.replace(prefix, '');
            });
            return callback(null, data);
        }
    }, {
        key: 'sortTags',
        value: function sortTags(tags, callback) {
            if (tags.constructor !== Array) {
                return callback('tags must be an array');
            }
            var data = tags.sort(function (a, b) {
                return b - a;
            });
            return callback(null, data);
        }
    }, {
        key: 'getNextTag',
        value: function getNextTag(tags, prefix, callback) {
            var _this = this;

            if (typeof tags !== 'string') {
                return callback('tags must be a string');
            }
            if (typeof prefix !== "string") {
                return callback('prefix must be a string');
            }
            var locals = {};
            _async2['default'].series([function (cb) {
                _this.parseTags(tags, function (err, data) {
                    if (err) {
                        cb(err);
                        return;
                    }
                    locals.parsedTags = data;
                    cb();
                });
            }, function (cb) {
                _this.filterTags(locals.parsedTags, prefix, function (err, data) {
                    if (err) {
                        cb(err);
                        return;
                    }
                    locals.filteredTags = data;
                    cb();
                });
            }, function (cb) {
                _this.stripPrefix(locals.filteredTags, prefix, function (err, data) {
                    if (err) {
                        cb(err);
                        return;
                    }
                    locals.strippedTags = data;
                    cb();
                });
            }, function (cb) {
                _this.sortTags(locals.strippedTags, function (err, data) {
                    if (err) {
                        cb(err);
                        return;
                    }
                    locals.sortedTags = data;
                    cb();
                });
            }], function (err, result) {
                if (err) {
                    return callback(err);
                }
                if (locals.sortedTags.length === 0) {
                    return callback(null, 0);
                }
                return callback(null, prefix + + locals.sortedTags[0]++);
            });
        }
    }]);

    return GitParser;
})();

exports['default'] = GitParser;
module.exports = exports['default'];
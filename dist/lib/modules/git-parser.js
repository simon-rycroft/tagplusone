/**
 * @file A set of methods for parsing the response from "git tag"
 * @author Simon Rycroft simon.rycroft@subcode.io
 * @copyright Subcode Ltd 2015
 * @license MIT
 */
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

        /**
         * @callback parseTagsCallback
         * @param {string} err
         * @param {array} data An array of tags.
         */

        /**
         * Splits the raw tags into an array.
         *
         * @param {string} tags The raw "git tags" response i.e. each tag on a new line.
         * @param {parseTagsCallback} callback
         */
        value: function parseTags(tags, callback) {
            if (typeof tags !== "string") {
                return callback('tags must be a string');
            }
            return callback(null, tags.split('\n'));
        }

        /**
         * @callback filterTagsCallback
         * @param {string} err
         * @param {array} data An array of tags.
         */

        /**
         * Filters an array of tags an returns only those matching the prefix.
         *
         * @param {array} tags An array of tags.
         * @param {string} prefix An optional tag prefix.
         * @param {filterTagsCallback} callback
         */
    }, {
        key: 'filterTags',
        value: function filterTags(tags, prefix, callback) {
            if (prefix === undefined) prefix = null;

            if (tags.constructor !== Array) {
                return callback('tags must be an array');
            }
            if (!prefix) {
                callback(null, tags);
            }
            if (prefix && typeof prefix !== "string") {
                return callback('prefix must be a string');
            }
            var validTagPattern = "^" + prefix + "[1-9]{1}[0-9]*$",
                regex = new RegExp(validTagPattern),
                filteredTags = tags.filter(function (tag) {
                return tag.match(regex);
            });
            callback(null, filteredTags);
        }

        /**
         * @callback stripPrefixCallback
         * @param {string} err
         * @param {array} data An array of tags.
         */

        /**
         * Returns the array of tags with the prefix removed from each.
         *
         * @param {array} tags An array of tags.
         * @param {string} prefix An optional tag prefix.
         * @param {stripPrefixCallback} callback
         */
    }, {
        key: 'stripPrefix',
        value: function stripPrefix(tags, prefix, callback) {
            if (prefix === undefined) prefix = null;

            if (tags.constructor !== Array) {
                return callback('tags must be an array');
            }
            if (prefix && typeof prefix !== "string") {
                return callback('prefix must be a string');
            }
            var data = _lodash2['default'].map(tags, function (tag) {
                return tag.replace(prefix, '');
            });
            return callback(null, data);
        }

        /**
         * @callback sortTagsCallback
         * @param {string} err
         * @param {array} data An array of tags.
         */

        /**
         * Sorts the tags numerically in descending order.
         *
         * @param {array} tags An array of tags without prefixes.
         * @param {sortTagsCallback} callback
         */
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

        /**
         * @callback getNextTagCallback
         * @param {string} err
         * @param {string} data The next tag in the sequence.
         */

        /**
         * Determines which should be the next tag in the sequence.
         *
         * @param {string} tags The raw tags returned by git i.e. each on a new line.
         * @param {string} prefix An optional tag prefix.
         * @param {getNextTagCallback} callback
         */
    }, {
        key: 'getNextTag',
        value: function getNextTag(tags, prefix, callback) {
            var _this = this;

            if (prefix === undefined) prefix = null;

            if (typeof tags !== 'string') {
                return callback('tags must be a string');
            }
            if (prefix && typeof prefix !== "string") {
                return callback('prefix must be a string');
            }
            var locals = {},
                num = undefined;
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
                    return callback(null, prefix + 1);
                }
                num = +locals.sortedTags[0];
                num++;
                return callback(null, prefix + num);
            });
        }
    }]);

    return GitParser;
})();

exports['default'] = GitParser;
module.exports = exports['default'];
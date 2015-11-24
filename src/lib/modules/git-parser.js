'use strict';

import _ from 'lodash';
import async from 'async';

export default class GitParser {

    parseTags(tags, callback) {
        if (typeof tags !== "string") {
            return callback('tags must be a string');
        }
        return callback(null, tags.split('\n'));
    }

    filterTags(tags, prefix = null, callback) {
        if (tags.constructor !== Array) {
            return callback('tags must be an array');
        }
        if (prefix && typeof prefix !== "string") {
            return callback('prefix must be a string');
        }
        let validTagPattern = "^" + prefix + "[1-9]{1}[0-9]*$",
            regex = new RegExp(validTagPattern),
            filteredTags = tags.filter((tag) => {
                return tag.match(regex);
            });
        callback(null, filteredTags);
    }

    stripPrefix(tags, prefix = null, callback) {
        if (tags.constructor !== Array) {
            return callback('tags must be an array');
        }
        if (prefix && typeof prefix !== "string") {
            return callback('prefix must be a string');
        }
        let data = _.map(tags, (tag) => {
            return tag.replace(prefix, ''); 
        });
        return callback(null, data);
    }

    sortTags(tags, callback) {
        if (tags.constructor !== Array) {
            return callback('tags must be an array');
        }
        let data = tags.sort((a, b) => {
            return b-a;
        });
        return callback(null, data);
    }

    getNextTag(tags, prefix = null, callback) {
        if (typeof tags !== 'string') {
            return callback('tags must be a string');
        }
        if (prefix && typeof prefix !== "string") {
            return callback('prefix must be a string');
        }
        let locals = {},
            num;
        async.series([
            (cb) => {
                this.parseTags(tags, (err, data) => {
                    if (err) {
                        cb(err);
                        return;
                    }
                    locals.parsedTags = data;
                    cb();
                });
            },
            (cb) => {
                this.filterTags(locals.parsedTags, prefix, (err, data) => {
                    if (err) {
                        cb(err);
                        return;
                    }
                    locals.filteredTags = data;
                    cb();
                });
            },
            (cb) => {
                this.stripPrefix(locals.filteredTags, prefix, (err, data) => {
                    if (err) {
                        cb(err);
                        return;
                    }
                    locals.strippedTags = data;
                    cb();
                });
            },
            (cb) => {
                this.sortTags(locals.strippedTags, (err, data) => {
                    if (err) {
                        cb(err);
                        return;
                    }
                    locals.sortedTags = data;
                    cb();
                });
            }
        ], (err, result) => {
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
}

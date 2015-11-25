/**
 * @file A set of methods for parsing the response from "git tag"
 * @author Simon Rycroft simon.rycroft@subcode.io
 * @copyright Subcode Ltd 2015
 * @license MIT
 */
'use strict';

import _ from 'lodash';
import async from 'async';

export default class GitParser {

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
    parseTags(tags, callback) {
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
    filterTags(tags, prefix = null, callback) {
        if (tags.constructor !== Array) {
            return callback('tags must be an array');
        }
        if (!prefix) {
            callback(null, tags);
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
    sortTags(tags, callback) {
        if (tags.constructor !== Array) {
            return callback('tags must be an array');
        }
        let data = tags.sort((a, b) => {
            return b-a;
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

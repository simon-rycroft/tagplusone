'use strict';

import {assert, expect} from 'chai';
import GitParser from '../../../../src/lib/modules/git-parser';

describe('The Git Parser', () => {

    let parser;

    beforeEach(() => {
        parser = new GitParser();
    });

    describe('parseTags() method', () => {

        it('should exist', () => {
            assert.isFunction(parser.parseTags);
        });

        it('should only accept a string as the first argument', (done) => {
            let input = {},
                expected = 'tags must be a string';
            parser.parseTags(input, (err, data) => {
                assert.ok(err, 'parseTags() accepted a non-string value as the first argument');
                assert.equal(expected, err);
                done();
            });
        });

        it('should convert a string of tags into an array of tags', (done) => {
            let input = 'v1\nv2\nv3',
                expected = ['v1', 'v2', 'v3'];
            parser.parseTags(input, (err, data) => {
                assert.ok(!err, 'parseTags() threw an unexpected error');
                assert.deepEqual(expected, data);
                done();
            }); 
        });
    });

    describe('filterTags() method', () => {
        
        it('should exist', () => {
            assert.isFunction(parser.filterTags);
        });

        it('should only accept an array as the tags argument', (done) => {
            let inputTags = 'I am a string',
                inputPrefix = 'v',
                expected = 'tags must be an array';
            parser.filterTags(inputTags, inputPrefix, (err, data) => {
                assert.ok(err, 'filterTags() accepted a non-array tags argument');
                assert.equal(expected, err);
                done();
            });
        });

        it('should only accept a string as the prefix argument', (done) => {
            let inputTags = [],
                inputPrefix = ['I am an array'],
                expected = 'prefix must be a string';
            parser.filterTags(inputTags, inputPrefix, (err, data) => {
                assert.ok(err, 'filterTags() accepted a non-string value for the prefix argument');
                assert.equal(expected, err);
                done();
            });
        });

        it('should only return tags having the prefix', (done) => {
            let inputTags = [
                    '1',
                    'v2',
                    'build3',
                    'v4',
                    'version4',
                    'v.4'
                ],
                inputPrefix = 'v',
                expected = [
                    'v2',
                    'v4',
                ];
            parser.filterTags(inputTags, inputPrefix, (err, data) => {
                assert.ok(!err, 'filterTags() threw an unexpected error');
                assert.deepEqual(expected, data, 'filterTags() did not filter the tags correctly');
                done();
            });
        });

        it('should return an empty array if no tags matching tags are found', (done) => {
            let inputTags = [
                    '1',
                    'v2',
                    'build3',
                    'v4',
                    'version4',
                    'v.4'
                ],
                inputPrefix = 'ver',
                expected = [];
            parser.filterTags(inputTags, inputPrefix, (err, data) => {
                assert.ok(!err, 'filterTags() threw an unexpected error');
                assert.deepEqual(expected, data, 'filterTags() did not filter the tags correctly');
                done();
            });
        });
    });

    describe('stripPrefix method', () => {

        it('should exist', () => {
            assert.isFunction(parser.stripPrefix);
        });

        it('should only accept an array as the tags argument', (done) => {
            let inputTags = {},
                inputPrefix = 'prefix',
                expected = 'tags must be an array';
            parser.stripPrefix(inputTags, inputPrefix, (err, data) => {
                assert.ok(err, 'stripPrefix() accepts a non-array value for the tags argument');
                assert.equal(expected, err);
                done();
            });
        });

        it('should only accept a string as the prefix argument', (done) => {
            let inputTags = [],
                inputPrefix = [],
                expected = 'prefix must be a string';
            parser.stripPrefix(inputTags, inputPrefix, (err, data) => {
                assert.ok(err, 'stripPrefix() accepts a non-string value for the prefix argument');
                assert.equal(expected, err);
                done();
            });
        });

        it('should return the same array with the prefix stripped from all values', (done) => {
            let inputTags = ['ver3', 'ver1', 'ver2'],
                inputPrefix = 'ver',
                expected = ['3', '1', '2'];
            parser.stripPrefix(inputTags, inputPrefix, (err, data) => {
                assert.ok(!err, 'stripPrefix() threw an unexpcted error');
                assert.deepEqual(expected, data);
                done();
            });
        });
    });

    describe('sortTags() method', () => {
        
        it('should exist', () => {
            assert.isFunction(parser.sortTags);
        });

        it('should only accept an array as the tags argument', (done) => {
            let inputTags = {},
                expected = 'tags must be an array';
            parser.sortTags(inputTags, (err, data) => {
                assert.ok(err, 'sortTags() accepts a non-array value for the tags argument');
                assert.equal(expected, err);
                done();
            });
        });

        it('should sort tags so the highest is the first in the array', (done) => {
            let inputTags = [
                    '100',
                    '1',
                    '23',
                    '101',
                    '99',
                    '15',
                    '102',
                    '6',
                ],
                expected = [
                    '102',
                    '101',
                    '100',
                    '99',
                    '23',
                    '15',
                    '6',
                    '1',
                ];
            parser.sortTags(inputTags, (err, data) => {
                assert.ok(!err, 'sortTags() threw an unexpected error');
                assert.deepEqual(expected, data, 'array was not correctly sorted');
                done();
            });
        });
    });

    describe('getNextTag() method', () => {

        it('should exist', () => {
            assert.isFunction(parser.getNextTag);
        });
            
        it('should only accept a string as the tags argument', (done) => {
            let inputTags = {},
                inputPrefix = 'prefix',
                expected = 'tags must be a string';
            parser.getNextTag(inputTags, inputPrefix, (err, data) => {
                assert.ok(err, 'getNextTag() accepts a non-array value for the tags argument');
                assert.equal(expected, err);
                done();
            });
        });

        it('should only accept a string as the prefix argument', (done) => {
            let inputTags = 'v1\nversion1\nbuild1\nv10\nv9\nv11\nv8',
                inputPrefix = [],
                expected = 'prefix must be a string';
            parser.getNextTag(inputTags, inputPrefix, (err, data) => {
                assert.ok(err, 'getNextTag() accepts a non-string value for the prefix argument');
                assert.equal(expected, err);
                done();
            });
        });

        it('should return the next tag in the series', (done) => {
            let inputTags = 'v1\nversion1\nbuild1\nv10\nv9\nv11\nv8',
                inputPrefix = 'v',
                expected = 'v11';
            parser.getNextTag(inputTags, inputPrefix, (err, data) => {
                assert.ok(!err, 'getNextTag() threw an unexpected error: ' + err);
                assert.equal(expected, data);
                done();
            });
        });
    });
});


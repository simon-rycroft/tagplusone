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

        xit('should sort tags so the highest is the first in the array', (done) => {
            let inputTags = [
                    'v100',
                    'v1',
                    'v23',
                    'v101',
                    'v99',
                    'v15',
                    'v102',
                    'v6',
                ],
                expected = [
                    'v102',
                    'v101',
                    'v100',
                    'v99',
                    'v23',
                    'v15',
                    'v6',
                    'v1',
                ];
            parser.sortTags(inputTags, (err, data) => {
                assert.ok(!err, 'sortTags() threw an unexpected error');
            });
        });
    });
});


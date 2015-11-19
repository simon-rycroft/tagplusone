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
                done();
            });
        });

        it('should only accept a string as the prefix argument', (done) => {
            let inputTags = [],
                inputPrefix = ['I am an array'],
                expected = 'prefix must be a string';
            parser.filterTags(inputTags, inputPrefix, (err, data) => {
                assert.ok(err, 'filterTags() accepted a non-string value for the prefix argument');
                done();
            });
        });

        xit('should only return tags having the prefix', (done) => {
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
        });
    })
});


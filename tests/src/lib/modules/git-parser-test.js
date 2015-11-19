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
                assert.ok(err, 'parseTags() did not throw an error');
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
});


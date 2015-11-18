'use strict';

import {assert, expect} from 'chai';
import mockery from 'mockery';
import async from 'async';
import mockSpawn from 'mock-spawn';
import _ from 'lodash';

const libPath = '../../../../src/lib/modules/GitClient';

describe('The Git Client', () => {

    let GitClient,
        git,
        spawn;

    beforeEach(() => {
        spawn = mockSpawn(false);
        mockery.enable({ useCleanCache: true });
        mockery.registerMock('child_process', { spawn: spawn });
        mockery.registerAllowables([
            libPath,
            'fancy-log',
            'chalk',
            'escape-string-regexp',
            'ansi-styles',
            'strip-ansi',
            'ansi-regex',
            'has-ansi',
            'supports-color',
            'dateformat',
        ], true);
        GitClient = require(libPath);
        git = new GitClient();
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

    describe('tag method', () => {

        it('should exist', () => {
            assert.isFunction(git.tag);
        });

        it('should execute the shell command "git tag" and capture the output', (done) => {
            let expected = 'v1\nv2\nv3';
            spawn.setDefault(spawn.simple(0, expected));
            git.tag((err, data) => {
                assert.ok(!err, 'tag() threw an unexpected error');
                assert.equal(1, spawn.calls.length, 'spawn() was not called the correct number of times');
                assert.equal('git', spawn.calls[0].command, 'incorrect spawn() command called');
                assert.deepEqual(['tag'], spawn.calls[0].args, 'spawn() was called with the wrong args');
                assert.isNull(err);
                assert.equal(expected, data);
                done();
            });
        });
    });
});

'use strict';

import {assert, expect} from 'chai';
import mockery from 'mockery';
import mockSpawn from 'mock-spawn';
import _ from 'lodash';

import GitClient from '../../../src/lib/GitClient';

describe('The Git Client', function() {
 
    let git,
        spawn;

    beforeEach(function() {
        git = new GitClient();
        spawn = mockSpawn(false);
        mockery.enable({ useCleanCache: true });
        mockery.registerMock('child_process', { spawn: spawn });
    });

    describe('tag method', function() {

        it('should exist', function() {
            assert.isFunction(git.tag);
        });

        it('should execute the shell command "git tag"', function () {
            git.tag();
            assert.equal(1, spawn.calls.length, 'Incorrect number of command calls.')
            assert.equal('tag', spawn.calls[0].command);
        });
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });
});

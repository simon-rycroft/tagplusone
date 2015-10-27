'use strict';

import {assert, expect} from 'chai';
import mockery from 'mockery';
import MockProcess from 'mock-spawn';
import _ from 'lodash';

import GitClient from '../../../src/lib/GitClient';

describe('The Git Client', function() {
 
    let libPath = '../../../src/lib/GitClient',
        gitClient,
        spawn;

    beforeEach(function() {
        gitClient = new GitClient();
        spawn = MockProcess(false);
        mockery.enable({ useCleanCache: true });
        mockery.registerMock('child_process', { spawn: spawn });
        mockery.registerAllowable(libPath);
    });

    describe('tag method', function() {

        it('should exist', function() {
            assert.isFunction(gitClient.tag);
        });

        it('should execute the shell command "git tag"', function () {
            gitClient.tag();
            assert.equal('tag', spawn.calls[0].command);
        });
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });
});

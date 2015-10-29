'use strict';

import {assert, expect} from 'chai';
import mockery from 'mockery';
import async from 'async';
import mockSpawn from 'mock-spawn';
import _ from 'lodash';

import GitClient from '../../../src/lib/GitClient';

describe('The Git Client', () => {

    let git,
        spawn;

    beforeEach(() => {
        git = new GitClient();
        spawn = mockSpawn(false);
        mockery.enable({ useCleanCache: true });
        mockery.registerMock('child_process', { spawn: spawn });
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

        it('should execute the shell command "git tag"', (done) => {
            spawn.setDefault(
                spawn.simple(0)
            );
            git.tag((err) => {
                assert.ok(!err, 'tag() threw an unexpected error');
                console.log(spawn.calls);
                assert.equal(1, spawn.calls.length, 'spawn() was not called the correct number of times');
                assert.equal('git', spawn.call.command, 'incorrect spawn() command called');
                done();
            })
            //async.series([
            //    (next) => { git.tag(next); }
            //], (err) => {
            //    assert.ok(!err);
            //    done();
            //});
            //git.tag();
            //assert.equal(1, spawn.calls.length, 'Incorrect number of command calls.')
            //assert.equal('tag', spawn.calls[0].command);
        });
    });
});

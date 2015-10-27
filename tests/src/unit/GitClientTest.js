'use strict';

import {assert, expect} from 'chai';
import MockProcess from 'mock-spawn';
import _ from 'lodash';

import GitClient from '../../../src/lib/GitClient';

describe('The Git Client', function() {
 
    let gitClient;

    beforeEach(function() {
        gitClient = new GitClient();
    });

    describe('tag method', function() {

        it('should exist', function() {
            assert.isFunction(gitClient.tag);
        });

        it('should execute the shell command "git tag"');
    });
});

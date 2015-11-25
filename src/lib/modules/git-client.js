/**
 * @file A simple wrapper around "git tag"
 * @author Simon Rycroft simon.rycroft@subcode.io
 * @copyright Subcode Ltd 2015
 * @license MIT
 */
'use strict';

import {spawn} from 'child_process';

export default class GitClient {

    /**
     * @callback tagCallback
     * @param {string} err
     * @param {string} data The tags returned from the git command.
     */

    /**
     * Calls "git tag" and captures the raw output.
     *
     * @param {string} prefix If set calls "git tag -l [prefix]*" to fetch only matching tags.
     * @param {tagCallback} callback Called when the full response has been received from git.
     */
    tag(prefix = null, callback) {

        if (prefix && typeof prefix !== 'string') {
            return callback('prefix must be a string');
        }

        let args = !prefix ? ['tag'] : ['tag', '-l', prefix + '*'],
            tag = spawn('git', args),
            output = '',
            err = '';

        tag.stdout.on('data', (data) => {
            output += data.toString();
        });

        tag.stderr.on('data', (data) => {
            err += data.toString();
        });

        tag.on('close', (code) => {
            if (code !== 0) {
                err += "git tag exited with error code " + code;
            }
            if (err) {
                return callback(err);
            } else {
                return callback(null, output);
            }
        });
    }
}


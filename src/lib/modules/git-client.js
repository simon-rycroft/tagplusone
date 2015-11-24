'use strict';

import {spawn} from 'child_process';

export default class GitClient {

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


'use strict';

import {spawn} from 'child_process';

export default class GitClient {

    tag(callback) {

        let tag = spawn('git', ['tag']),
            output, err;

        tag.stdout.on('data', (data) => {
            output += data.toString();
        });

        tag.stderr.on('err', (data) => {
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

